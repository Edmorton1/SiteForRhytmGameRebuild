# SiteForRhytmGameRebuild

Как поднять проект?
```bash
# Склонировать себе
git clone https://github.com/Edmorton1/SiteForRhytmGameRebuild

# Создать симлинки
node createSymlinks.js

# Развернуть в docker
docker-compose up
```

Но в таком подходе есть проблема

**Docker HMR** следит только за папками shared и src,

Поэтому при установке новых пакетов

Ничего не обновляется и проект надо ребилдить заново
