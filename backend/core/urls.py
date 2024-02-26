import re
from typing import List, Union
from django.contrib import admin
from django.urls import path, include
from django.urls import URLPattern, URLResolver, path, include, re_path
from django.conf import settings
from django.views.static import serve

urlpatterns: List[Union[URLResolver, URLPattern]] = [
    path('admin/', admin.site.urls),
    path("api/accounts/", include("accounts.urls")),
    path("api/todos/", include("todo.urls")),
]

urlpatterns.extend(
    [
        re_path(
            r"^%s(?P<path>.*)$" % re.escape(settings.MEDIA_URL.lstrip("/")),
            serve,
            kwargs={"document_root": settings.MEDIA_ROOT},
        )
    ]
)
