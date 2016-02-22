<?php
@include_once("Conection.php");
fConnDB();
// A simple web site in Cloud9 that runs through Apache
// Press the 'Run' button on the top to start the web server,
// then click the URL that is emitted to the Output tab of the console

echo 'Hello world from Cloud9!';

?>
<html>
    <head>
        
    </head>
    <body>
        Teste
        
        <table>
                 <?php
                    $par = 0;
                    
                    for ($i = 1; $i <= 5; $i++) {
                         echo "<tr>";
                        for ( $j = 1; $j <= 2; $j++ ) {
                           
                           $par += $j;
                           
                            if ( $j % 2 === 0 ) {
                                echo "<td> $par </td>";
                            }
                            if ( $j % 2 != 0 ) {
                                echo "<td> $par </td>";
                            }
                            
                        }
                        echo "</tr>";
                    }
                ?>
                
                
                
          </table>
          
          <table class="table table-hover">
				<thead class="bordered-darkorange">
					<tr>
						<th>Ordem</th>
						<th>Dom</th>
						<th>Pontua&ccedil;&atilde;o</th>
					</tr>
				</thead>
				<tbody>
				<?php
			/*	$rsitem = $GLOBALS['conn']->Execute("SELECT i.ds_item, i.nr_item
    									  FROM HS_RESULTADO r
    								INNER JOIN HS_RESULT_ITEM i ON (i.id_hs_resultado = r.id)
    									 WHERE r.id = ?
    								  ORDER BY i.nr_item DESC, i.ds_item	
    								", array($id) );*/
    								
    			$rsitem = $GLOBALS['conn']->Execute("SELECT customerNumber, customerName
    									  FROM customers" );						
				
				$ordem = 0;
				while (!$rsitem->EOF):
					$ordem++;
					?>
					<tr>
					<td><?php echo $ordem;?>&ordm;</td>
					<td><?php echo $rsitem->fields['customerNumber'];?></td>
					<td><?php echo $rsitem->fields['customerName'];?></td>
					</tr>
					<?php
					$rsitem->MoveNext();
				endwhile;
				?>
				</tbody>
			</table>
    </body>
</html>