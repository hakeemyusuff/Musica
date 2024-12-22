from datetime import datetime
from django import template

register = template.Library()

@register.simple_tag
def time_of_day():
    now = datetime.now()
    hour = now.hour
    if 5 <= hour < 12:
        return "Morning"
    elif 12 <= hour < 17:
        return "Afternoon"
    else:
        return "Evening"