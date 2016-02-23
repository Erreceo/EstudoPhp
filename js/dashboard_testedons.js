$(document).ready(function(){
	$('#simpledatatable')
		.on( 'init.dt', function () {
			mapQuestao();
			
			jsLIB.ajaxCall( true, jsLIB.rootDir+"rules/ajaxTestes.php", 
				{ MethodName : 'getRsDons', data : {} },
				function( data, jqxhr ){
					if ( data.return == true ) {
						e.preventDefault();
						fSetControle(data.result.pc_conc);
					}
				}
			);
		})
		.dataTable({
			pageLength: 15,
			lengthChange: false,
			ordering: false,
			paging: true,
			searching: false,
			processing: true,
			pagingType: "full_numbers",
			language: {
				info: "_START_ a _END_ de _TOTAL_ quest&otilde;es",
				infoEmpty: "N&atilde;o h&aacute; respostas pendentes",
				loadingRecords: "Aguarde - carregando...",
				paginate: {
					first: '<<',
					previous: '<',
					next:     '>',
					last:     '>>'
				}
			},
			data: prepareData(),
			columns: [
				{	data: 'ds_qst',
					sortable: false
				}
			]
		})
		.on( 'draw.dt', function () {
			mapQuestao();
		});
	
	$('#btnFinish').click( function() {
		jsLIB.ajaxCall( false, jsLIB.rootDir+"rules/ajaxTestes.php", { MethodName : 'finalizarDons' } );
		window.location.reload(true);
	});
});

function mapQuestao(){
	$("[name=questao]").change(function(e){
		var value = $(this).val();
		
		jsLIB.ajaxCall( true, jsLIB.rootDir+"rules/ajaxTestes.php", 
			{ MethodName : 'setRsDons', data : { id_qs : $(this).attr('id-questao'), id_rs : value } },
			function( data, jqxhr ){
				if ( data.return == true ) {
					e.preventDefault();
					fSetControle(data.result.pc_conc);
				}
			}
		);
		
		if ( value != '' ) {
			$(this).parent().removeClass('has-error').addClass('has-success');
		} else {
			$(this).parent().removeClass('has-success').addClass('has-error');
		}
	});
}

function prepareData(){
	data = jsLIB.ajaxCall( false, jsLIB.rootDir+"rules/ajaxTestes.php", { MethodName : 'questoes' }, 'RETURN' );
	fSetControle(data.result.pc_conc)
	return data.questoes;
	
}

function fSetControle(pcConc){
	$('#myProgressbar').progressbar(pcConc);
	if ( pcConc < 100 ) {
		$('#myProgressbar').show();
		$('#btnFinish').hide();
	} else {
		$('#myProgressbar').hide();
		$('#btnFinish').show();
	}
}