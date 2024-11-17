from django.urls import path
from . import views

urlpatterns = [
    path("", views.list_media, name="media" ),
    # path("songs", views.ListSong.as_view(), name="list_songs"),
    # path("playlists", views.ListPlaylist.as_view(), name="list_playlists"),
]