const {Store} = require('express-session');

function optionalCb(err, data, cb = undefined) {
  if (cb) return cb(err, data);
  if (err) throw err;
  return data;
}

class RedisStore extends Store {
  constructor(opts) {
    super();
    this.prefix = opts.prefix == null ? 'sess:' : opts.prefix;
    this.scanCount = opts.scanCount || 100;
    this.serializer = opts.serializer || JSON;
    this.ttl = opts.ttl || 86400; // One day in seconds.
    this.disableTTL = opts.disableTTL || false;
    this.disableTouch = opts.disableTouch || false;
    this.client = opts.client;
  }

  async get(sid, cb = undefined) {
    const key = this.prefix + sid;
    try {
      const data = await this.client.get(key);
      if (!data) return optionalCb(null, null, cb);
      return optionalCb(null, await this.serializer.parse(data), cb);
    } catch (err) {
      return optionalCb(err, null, cb);
    }
  }

  async set(sid, sess, cb = undefined) {
    const key = this.prefix + sid;
    const ttl = this._getTTL(sess);
    try {
      if (ttl > 0) {
        const val = this.serializer.stringify(sess);
        if (this.disableTTL) await this.client.set(key, val);
        else await this.client.set(key, val, 'EX', ttl);
        return optionalCb(null, null, cb);
      }
      return this.destroy(sid, cb);
    } catch (err) {
      return optionalCb(err, null, cb);
    }
  }

  async touch(sid, sess, cb = undefined) {
    const key = this.prefix + sid;
    if (this.disableTouch || this.disableTTL) return optionalCb(null, null, cb);
    try {
      await this.client.expire(key, this._getTTL(sess));
      return optionalCb(null, null, cb);
    } catch (err) {
      return optionalCb(err, null, cb);
    }
  }

  async destroy(sid, cb = undefined) {
    const key = this.prefix + sid;
    try {
      await this.client.del([key]);
      return optionalCb(null, null, cb);
    } catch (err) {
      return optionalCb(err, null, cb);
    }
  }

  async clear(cb = undefined) {
    try {
      const keys = await this._getAllKeys();
      if (!keys.length) return optionalCb(null, null, cb);
      await this.client.del(keys);
      return optionalCb(null, null, cb);
    } catch (err) {
      return optionalCb(err, null, cb);
    }
  }

  async length(cb = undefined) {
    try {
      const keys = await this._getAllKeys();
      return optionalCb(null, keys.length, cb);
    } catch (err) {
      return optionalCb(err, null, cb);
    }
  }

  async ids(cb = undefined) {
    const len = this.prefix.length;
    try {
      const keys = await this._getAllKeys();
      return optionalCb(
        null,
        keys.map((k) => k.substring(len)),
        cb
      );
    } catch (err) {
      return optionalCb(err, null, cb);
    }
  }

  async all(cb = undefined) {
    const len = this.prefix.length;
    try {
      const keys = await this._getAllKeys();
      if (keys.length === 0) return optionalCb(null, [], cb);

      const data = await this.client.mget(keys);
      const results = data.reduce((acc, raw, idx) => {
        if (!raw) return acc;
        const sess = this.serializer.parse(raw);
        sess.id = keys[idx].substring(len);
        acc.push(sess);
        return acc;
      });
      return optionalCb(null, results, cb);
    } catch (err) {
      return optionalCb(err, null, cb);
    }
  }

  _getTTL(sess) {
    if (typeof this.ttl === 'function') {
      return this.ttl(sess);
    }

    let ttl;
    if (sess?.cookie?.expires) {
      const ms = Number(new Date(sess.cookie.expires)) - Date.now();
      ttl = Math.ceil(ms / 1000);
    } else {
      ttl = this.ttl;
    }
    return ttl;
  }

  async _getAllKeys() {
    const pattern = this.prefix + '*';
    const set = new Set();
    for await (const keys of this._scanIterator(pattern, this.scanCount)) {
      for (const key of keys) {
        set.add(key);
      }
    }
    return set.size > 0 ? Array.from(set) : [];
  }

  // private scanIterator(match: string, count: number) {
  // 	const client = this.client;

  // 	if (!("masters" in client)) {
  // 		return client.scanIterator({ MATCH: match, COUNT: count });
  // 	}

  // 	return (async function* () {
  // 		for (const master of client.masters) {
  // 			const c = await client.nodeClient(master);
  // 			for await (const keys of c.scanIterator({
  // 				COUNT: count,
  // 				MATCH: match,
  // 			})) {
  // 				yield keys;
  // 			}
  // 		}
  // 	})();
  // }

  _scanIterator(match, count) {
    const client = this.client;

    // Standalone Redis
    if (!('nodes' in client)) {
      const redis = client;
      return (async function* () {
        const stream = redis.scanStream({match, count});
        for await (const keys of stream) {
          yield keys;
        }
      })();
    }

    // Cluster Redis
    const cluster = client;
    return (async function* () {
      for (const node of cluster.nodes('master')) {
        const stream = node.scanStream({match, count});
        for await (const keys of stream) {
          yield keys;
        }
      }
    })();
  }
}

module.exports = {
  RedisStore
};
