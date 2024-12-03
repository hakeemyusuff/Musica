from django.urls import path
from . import views

urlpatterns = [
    path("", views.list_media, name="media" ),
    path("album/<int:id>", views.get_album_songs, name="album_songs"),
    path("likes/", views.get_liked_songs, name="likes-page"),
    path("collection/", views.get_collection, name="collection"),
    # path("songs", views.ListSong.as_view(), name="list_songs"),
    # path("playlists", views.ListPlaylist.as_view(), name="list_playlists"),
]