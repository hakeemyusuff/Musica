from rest_framework import generics
from django.shortcuts import get_object_or_404, render
from .models import Album, Playlist, Song, SongLike, Collection
from .serializers import PlaylistSerializer, SongSerializer
from django.db.models import Count, Sum


# def list_song(request):
#     songs = Song.objects.get(pk=6)
#     return render(request, "main.html", {"songs": songs})


def list_media(request):
    # songs = Song.objects.all()[:10]
    songs = Song.objects.all()
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
        "section": "home"
    }
    return render(request, "main.html", context)


def get_album_songs(request, id):
    album = get_object_or_404(Album, pk=id)
    songs = album.songs.all()
    album_duration = (
        songs.aggregate(total_duration=Sum("duration"))["total_duration"] or 0
    )
    album_duration = album_duration.total_seconds() / 3600
    return render(
        request,
        "components/albums.html",
        {"album": album, "songs": songs, "album_duration": album_duration},
    )

# def collection_page(request):
#     return render(request, "components/collection-page.html")


def get_collection(request):
    collections = Collection.objects.filter(user=request.user)
    albums = [collection.album for collection in collections]
    return render(
        request,''
        "components/collection-page.html",
        {"albums": albums, "section": "collection"},
    )

def get_liked_songs(request):
    liked_songs = Song.objects.filter(liked_songs__user=request.user)
    return render(request, "components/likes.html", {"liked_songs": liked_songs, "section": "likes"})

# class ListSong(generics.ListAPIView):
#     queryset = Song.objects.all()
#     serializer_class = SongSerializer

# class ListPlaylist(generics.ListAPIView):
#     queryset = Playlist.objects.filter(pk=1)
#     for i in queryset:
#         print(i.songs.all())
#     serializer_class = PlaylistSerializer
