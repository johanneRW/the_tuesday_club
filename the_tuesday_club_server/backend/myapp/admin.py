from django.contrib import admin

from .models import AlbumAdditionalInfo, AlbumEANcode, AlbumFormat, AlbumGenre, AlbumReleaseYear, AlbumUPC, AlbumUnitFormat, Artist, Genre, Label, AlbumImage, Album, AlbumPrice, PileStatus, Pile, PileItem, Address
admin.site.register(Artist)
admin.site.register(Label)
admin.site.register(AlbumImage)
admin.site.register(AlbumPrice)
admin.site.register(PileStatus)
admin.site.register(Pile)
admin.site.register(PileItem)
admin.site.register(Address)
admin.site.register(AlbumReleaseYear)
admin.site.register(AlbumEANcode)
admin.site.register(AlbumUPC)
admin.site.register(AlbumFormat)
admin.site.register(AlbumUnitFormat)
admin.site.register(AlbumAdditionalInfo)
admin.site.register(Genre)
admin.site.register(AlbumGenre)


class AlbumAdmin(admin.ModelAdmin):
    list_display = ('album_id', 'album_name')
    search_fields = ('album_name',)
    #list_filter = ('album_year',)

admin.site.register(Album, AlbumAdmin)
