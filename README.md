# Musica 🎵 - Music Streaming Platform

Musica is a web-based music streaming platform that lets you discover, play, and organize your favorite tracks. Built with Django, HTMX, and Tailwind CSS.

## Features

- User authentication(login, registration, password reset).
- Music playback with player controls (play/pause, next/previous, volume control, progress bar).
- Responsive design for mobile and desktop.
- Dynamic UI with HTMX interactions for a smooth user experience.

## Tech Stack

- **Backend**: Django
- **Frontend**:
  -TailwindCSS and daisyUI for styling
  -HTMX for dynamic interactions
  -Javascript for audio player functionality
- **Database**: postgresSQL
- **Storage**: AWS S3 for media files
- **Deployment**: [Render, Neon for database]

## Project Structure

musica/
├── music/ # Main app directory
│ ├── static/ # Static files
│ │ ├── css/ # CSS files
│ │ ├── js/ # JavaScript files
│ │ └── assets/ # Images and icons
│ ├── templates/ # HTML templates
│ ├── models.py # Database models
│ ├── views.py # View controllers
│ └── urls.py # URL routing
└── musica/ # Project settings

## Installation Instructions

To run the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/hakeemyusuff/musica.git

# Navigate to the project directory
cd musica

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

#Build frontend assets:
npm run build

# Set up environment variable in .env

# Run migrations
python manage.py migrate

# Start the development server
python manage.py runserver

## Contributing
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request
```
