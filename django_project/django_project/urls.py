from django.contrib import admin
from django.urls import path, re_path
from students import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login', views.login_view, name='login'),
    path('api/logout', LogoutView.as_view(next_page='/'), name='logout'),
    re_path(r'^api/students/$', views.students_list),
    re_path(r'^api/students/(\d+)$', views.students_detail),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
