from django.contrib import admin

from .models import Artist, Label, AlbumImage, Album, AlbumPrice, PileStatus, Pile, PileItem, Address
admin.site.register(Artist)
admin.site.register(Label)
admin.site.register(AlbumImage)
admin.site.register(AlbumPrice)
admin.site.register(PileStatus)
admin.site.register(Pile)
admin.site.register(PileItem)
admin.site.register(Address)

class AlbumAdmin(admin.ModelAdmin):
    list_display = ('album_id', 'album_name', 'album_year')
    search_fields = ('album_name',)
    list_filter = ('album_year',)

admin.site.register(Album, AlbumAdmin)
