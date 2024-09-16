from django.urls import path
from .views import ProductListCreateView,ProductDetailView

urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name="products"),
    path('products/<str:pk>/', ProductDetailView.as_view(), name="product-detail"),
]