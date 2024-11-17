from django.contrib import admin
from . import models

admin.site.register(models.Song)
admin.site.register(models.Album)
admin.site.register(models.Playlist)
admin.site.register(models.SongLike)
admin.site.register(models.Collection)
admin.site.register(models.AlbumLike)

