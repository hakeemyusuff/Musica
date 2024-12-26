from django.db import models
from django.conf import settings
from .custom_storage import MediaStorage

# from django.utils import timezone


class Album(models.Model):
    title = models.CharField(max_length=250)
    artist = models.CharField(max_length=250)
    release_date = models.DateField(blank=True, null=True)
    album_description = models.TextField()
    album_cover = models.ImageField(upload_to="album_cover/", blank=True, storage=MediaStorage())

    class Meta:
        ordering = ["-release_date"]

    def __str__(self) -> str:
        return self.title


class Playlist(models.Model):
    name = models.CharField(max_length=250)
    created_date = models.DateField(auto_now_add=True)
    playlist_cover = models.ImageField(
        upload_to="playlist_cover/", blank=True, storage=MediaStorage()
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="playlists",
    )

    class Meta:
        ordering = ["-created_date"]

    def __str__(self) -> str:
        return self.name


class Song(models.Model):
    song_name = models.CharField(max_length=250)
    artist = models.CharField(max_length=250)
    duration = models.DurationField()
    release_date = models.DateField()
    song_url = models.FileField(upload_to="songs/", storage=MediaStorage())
    cover_image = models.ImageField(upload_to="songs_cover/", blank=True, storage=MediaStorage())
    album = models.ForeignKey(Album, on_delete=models.PROTECT, related_name="songs")
    playlist = models.ManyToManyField(Playlist, related_name="songs", blank=True)

    class Meta:
        ordering = ["-release_date"]

    def __str__(self) -> str:
        return self.song_name


class SongLike(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    song = models.ForeignKey(
        Song,
        on_delete=models.CASCADE,
        related_name="liked_songs",
    )

    class Meta:
        unique_together = ["user", "song"]

    def __str__(self) -> str:
        return self.song.song_name


class AlbumLike(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="liked_albums",
    )
    album = models.ForeignKey(Album, on_delete=models.CASCADE)

    class Meta:
        unique_together = ["user", "album"]

    def __str__(self) -> str:
        return self.album.title


class Collection(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="liked_album",
    )
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name="collection")

    class Meta:
        unique_together = ["user", "album"]

    def __str__(self) -> str:
        return self.album.title
