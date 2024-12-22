from django.urls import reverse
from django.shortcuts import get_object_or_404, render
from music.forms import CustomPasswordResetForm, UserRegistrationForm
from .models import Album, Playlist, Song, SongLike, Collection
from django.contrib.auth.views import PasswordResetView
from django.db.models import Count, Sum
from django.contrib.auth.decorators import login_required
from django.utils.http import urlencode


def list_media(request):
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
        "section": "home",
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

def get_collection(request):
    if request.user.is_authenticated:
        collections = Collection.objects.filter(user=request.user)
        albums = [collection.album for collection in collections]
        return render(
            request,
            "" "components/collection-page.html",
            {"albums": albums, "section": "collection"},
        )
    else:
        return render(request, "components/unauthorized.html")


@login_required
def get_liked_songs(request):
    liked_songs = Song.objects.filter(liked_songs__user=request.user)
    return render(
        request,
        "components/likes.html",
        {"liked_songs": liked_songs, "section": "likes"},
    )


class CustomPasswordResetView(PasswordResetView):
    html_email_template_name = "registration/password_reset_email.html"
    from_email = "hakeemyusuff19@gmail.com"
    form_class = CustomPasswordResetForm


def register(request):
    if request.method == 'POST':
        user_form = UserRegistrationForm(request.POST)
        if user_form.is_valid():
            new_user = user_form.save(commit=False)
            new_user.set_password(user_form.cleaned_data['password'])
            new_user.save()
            return render(request, "components/register_done.html", {'new_user': new_user})
    else:
        user_form = UserRegistrationForm()
    return render(request, 'components/register.html', {'user_form': user_form})
    