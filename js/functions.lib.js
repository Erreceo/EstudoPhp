// JavaScript Document
/**
 *
 * PROTOTYPES
 *
 **/
Number.PAD_LEFT  = 0;
Number.PAD_RIGHT = 1;
Number.PAD_BOTH  = 2;

/**
 * 
 */
String.prototype.isEmpty = function() {
	return ( this.lenght == 0 ) || ( this.trim().length == 0 );
};

/**
 * 
 */
String.prototype.toInt = function() {
	return this.isEmpty() ? 0 : parseInt( this.replaceAll( ".", "" ), 10 );
};

/**
 * 
 * @param oldVal
 * @param newVal
 * @return
 */
String.prototype.replaceAll = function( oldVal, newVal ) {
	var str = this;

	while ( str.indexOf( oldVal ) > -1 ) {
		str = str.replace( oldVal, newVal );
	};

	return str;
};

/**
 *
 * @param size
 * @param pad
 * @param side
 */
Number.prototype.toPadString = function( size, pad, side ) {
	if ( !pad ) {
		pad = "0";
	};
	
	if ( !side ) {
		side = Number.PAD_LEFT;
	};
	
  	var str    = "" + this, 
  	    append = "", 
  	    size   = ( size - str.length );
 	var pad = ( ( pad != null ) ? pad : " " );
	
  	if ( side == Number.PAD_BOTH ) {
    	str = str.pad((Math.floor(size / 2) + str.length), pad, String.PAD_LEFT);
		
    	return str.pad((Math.ceil(size / 2) + str.length), pad, String.PAD_RIGHT);
  	};
	
  	while ((size -= pad.length) > 0) {
    	append += pad;
  	};
	
  	append += pad.substr(0, (size + pad.length));
	
  	return ((side == Number.PAD_LEFT) ? append.concat(str) : str.concat(append));
};

/**
 * 
 */
Date.prototype.toFormattedDate = function() {
	var month = this.getMonth() + 1;
	
	return this.getDate().toPadString(2) + "/" + 
		   month.toPadString(2) + "/" + 
		   this.getFullYear();
};

/**
 * 
 */
Date.prototype.toDateTime = function() {
	var month = this.getMonth() + 1;
	
	return this.getFullYear() + "-" +
	       month.toPadString(2) + "-" +
		   this.getDate().toPadString(2) + " " +
		   this.getHours().toPadString(2) + ":" +
		   this.getMinutes().toPadString(2) + ":" +
		   this.getSeconds().toPadString(2);
		   // + "." +this.getMilliseconds().toPadString(3)
};

var jsLIB = {
	rootDir			: undefined,
	
	watingDialog	: new BootstrapDialog({
		size: BootstrapDialog.SIZE_SMALL,
		closable: false,
		draggable: false,
		message: function(dialogRef){
			var $message = $('<div align="center"><i class="fa fa-cog fa-spin" style="font-size:300px"></i></div>');
			return $message;
		}
	}),

	modalWaiting : function( show ) {
		if ( !jsLIB.watingDialog.opened ) {
			jsLIB.watingDialog.realize();
			jsLIB.watingDialog.getModalHeader().hide();
			jsLIB.watingDialog.getModalFooter().hide();
			jsLIB.watingDialog.getModalBody().css('background-color', '#0088cc');
			jsLIB.watingDialog.getModalBody().css('color', '#fff');
		}
		if (show) {
			jsLIB.watingDialog.open();
		} else {
			jsLIB.watingDialog.close();
		}
	},
	
	ajaxCall : function( pasync, url, data, callBackSucess, callBackError ) {
		var retorno;
		if (!pasync) {
			jsLIB.modalWaiting(true);
		}
		$.ajax({
			url		: url,
			async		: pasync,
			type		: 'post',
			data		: data,
			dataType	: 'json',
			
			success	: function( data, textStatus, jqxhr ) {
				if (!pasync) {
					jsLIB.modalWaiting(false);
				}
				if ( typeof( callBackSucess ) == 'function' ) {
					callBackSucess( data, jqxhr );
				} else if ( callBackSucess === 'RETURN' ) {
					retorno = data;
				}
			},
			
			error	: function( jqxhr, textStatus, errorMessage ) {
				if (!pasync) {
					jsLIB.modalWaiting(false);
				}
				if ( typeof( callBackError ) == 'function' ) {
					callBackError( jqxhr, errorMessage );
				}
			}               
		});
		if (!pasync) {
			jsLIB.modalWaiting(false);
		}
		return retorno;
	},
	
	populateForm : function( frm, data ) {
		$.each( data, function( key, value ) {
			var $ctrl = $('[field='+key+']', frm );
			switch ( $ctrl.attr("type") ) {
				case "radio":
				case "checkbox":
					$ctrl.each(function(){
						if ( $(this).attr('value') == value ){
							$(this).attr("checked",value);
						} 
					});
					break;  
				case "text":
					if ( $ctrl.parent().attr("datatype") == 'datetimepicker' ) {
						$ctrl.parent().data("DateTimePicker").date( new Date(value.toInt()) );
						break;
					}
				case "hidden":
				default:
					$ctrl.val(value); 
			}  
		}); 
	},
	
	getJSONFields : function( frm ) {
		var retorno = {};
		frm.find( $('[field]') ).each( function() {
			var value = "";
			switch ( $(this).attr("type") ) {
				case "radio":
				case "checkbox":
					field.each( function() {
						if ( $(this).attr("checked") ) {
							value = $(this).val();
							return;
						} 
					});
					break;
				default:
					value = $(this).val();
			}
			retorno[$(this).attr("field")] = value;
		});
		return retorno;
	},
	
	resetForm : function( frm ) {
		frm.find( $('[field]') ).each( function() {
			var value = '';
			if ( $(this).attr('default-value') != '' ) {
				value = $(this).attr('default-value');
			}
			switch ( $(this).attr("type") ) {
				case "radio":
				case "checkbox":
					field.each( function() {
						$(this).attr("checked") = false;
						$(this).change();
					});
					break;
				case "text":
					if ( $(this).parent().attr("datatype") == 'datetimepicker' ) {
						$(this).parent().data("DateTimePicker").date( null );
						$(this).val(value);
						$(this).change();
						break;
					}
				default:
					$(this).val(value);
					$(this).change();
			}
		});
	}
};