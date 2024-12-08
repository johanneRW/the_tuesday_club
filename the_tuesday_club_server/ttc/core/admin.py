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
admin.site.register(AlbumUnitFormat)
admin.site.register(AlbumAdditionalInfo)
admin.site.register(Genre)
admin.site.register(AlbumGenre)



class AlbumAdmin(admin.ModelAdmin):
    list_display = ( 'album_name', 'get_artist', 'get_units', 'get_format', 'get_label')
    search_fields = ('album_name',)

    def get_artist(self, obj):
        return obj.artist_id.artist_name
    get_artist.short_description = 'Artist'
    
    def get_units(self, obj):
        album_unit_format = AlbumUnitFormat.objects.get(album_id=obj)
        return album_unit_format.album_units
    get_units.short_description = 'Units'
    
    def get_format(self, obj):
        album_unit_format = AlbumUnitFormat.objects.get(album_id=obj)
        return album_unit_format.album_format_id.album_format
    get_format.short_description = 'Format'

    def get_label(self, obj):
        return obj.label_id.label_name
    get_label.short_description = 'Label'

admin.site.register(Album, AlbumAdmin)

class FormatAdmin(admin.ModelAdmin):
    def get_album_format(self, obj):
        return obj.album_format  
    get_album_format.short_description = 'Format'

    list_display = ('get_album_format',) 

admin.site.register(AlbumFormat, FormatAdmin)

