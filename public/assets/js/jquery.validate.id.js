(function(factory){
	if(typeof define === "function" && define.amd){
		define( ["jquery", "../jquery.validate"], factory);
	}else if (typeof module === "object" && module.exports){
		module.exports = factory(require("jquery"));
	}else{
		factory(jQuery);
	}
}(function($){
$.extend( $.validator.messages, {
	// required: "Kolom ini diperlukan.",
	remote: "Harap benarkan kolom ini.",
	email: "Email tidak valid.",
	url: "Silakan masukkan format URL yang benar.",
	date: "Silakan masukkan format tanggal yang benar.",
	dateISO: "Silakan masukkan format tanggal(ISO) yang benar.",
	number: "Silakan masukkan angka yang benar.",
	digits: "Harap masukan angka saja.",
	creditcard: "Harap masukkan format kartu kredit yang benar.",
	equalTo: "Harap masukkan nilai yg sama dengan sebelumnya.",
	// maxlength: $.validator.format( "Input dibatasi hanya {0} karakter." ),
	// minlength: $.validator.format( "Input tidak kurang dari {0} karakter." ),
	rangelength: $.validator.format( "Panjang karakter yg diizinkan antara {0} dan {1} karakter." ),
	range: $.validator.format( "Harap masukkan nilai antara {0} dan {1}." ),
	max: $.validator.format( "Harap masukkan nilai lebih kecil atau sama dengan {0}." ),
	min: $.validator.format( "Harap masukkan nilai lebih besar atau sama dengan {0}." )
});
return $;
}));

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

$.validator.messages.required = function(p, i){
	var _ = $('[name="' + i.name + '"]').attr('alert') ?? i.name;
    return _.capitalize() + ' wajib diisi.';
}

$.validator.messages.minlength = function(p, i){
	var _ = $('[name="' + i.name + '"]').attr('alert') ?? i.name;
    return 'Panjang ' + _ + ' minimal ' + p + ' karakter.';
}

$.validator.messages.maxlength = function(p, i){
	var _ = $('[name="' + i.name + '"]').attr('alert') ?? i.name;
    return 'Panjang ' + _ + ' maksimal ' + p + ' karakter.';
}