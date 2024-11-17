from rest_framework import generics
from django.shortcuts import render
from .models import Album, Playlist, Song
from .serializers import PlaylistSerializer, SongSerializer
from django.db.models import Count, Sum


# def list_song(request):
#     songs = Song.objects.get(pk=6)
#     return render(request, "main.html", {"songs": songs})


def list_media(request):
    # songs = Song.objects.all()[:10]
    songs = Song.objects.get(pk=6)
    albums = Album.objects.get(pk=2)
    liked_albums = Album.objects.annotate(
        likes=Count("albumlike"), album_duration=Sum("songs__duration")
    ).order_by("-likes")[:3]
    most_liked_album = liked_albums.first()
    context = {
        "songs": songs,
        "albums": albums,
        "liked_albums": liked_albums,
        "most_liked_album": most_liked_album,
    }
    return render(request, "main.html", context)


# class ListSong(generics.ListAPIView):
#     queryset = Song.objects.all()
#     serializer_class = SongSerializer

# class ListPlaylist(generics.ListAPIView):
#     queryset = Playlist.objects.filter(pk=1)
#     for i in queryset:
#         print(i.songs.all())
#     serializer_class = PlaylistSerializer
