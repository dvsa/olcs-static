<?php
	$pageTitle = "OLCS Tables";
	$pageSubtitle = "Everything you need to create complex tables";
?>
		<?php include 'includes/global-header.php'; ?>

		<div class="page-wrapper">
			<?php include 'includes/global-breadcrumbs.php'; ?>

			<div id="main" role="main" tabindex="-1" class="main">

				<?php include 'includes/page-header.php';  ?>
				<div class="table__header">				
					<h2>Table header</h2>
					<div class="actions right-aligned">
						<input class="button--primary" type="submit" value="Add">
						<input class="button--secondary" type="submit" value="Edit" disabled="disabled">
						<input class="button--warning" type="submit" value="Delete" disabled="disabled">
					</div><!-- end actions- right -->
				</div><!-- end table__header -->
				<div class="table__wrapper">
					<table>
						<thead>
							<tr>
								<th></th>
								<th>Licence number</th>
								<th>Operator / trading name</th>
								<th>Postcode</th>
								<th>First name</th>
								<th>Last name</th>
								<th>Date of birth</th>
								<th>Convictions</th>
							</tr>
						</thead>
						<tbody>
						<tr>
							<td><input type="checkbox"></td>
							<td><a href="">76163222712</a></td>
							<td><a href="">Jim Jefferey's Haulage LTD</a></td>
							<td>LS7 4QP</td>
							<td>James</td>
							<td>Jefferey</td>
							<td>07/02/1963</td>
							<td><a href="">14</a></td>
						</tr>
						<tr>
							<td><input type="checkbox"></td>
							<td><a href="">3623324227</a></td>
							<td><a href="">Amber Taxis</a></td>
							<td>LS3 2PS</td>
							<td>Mohammed</td>
							<td>Ali</td>
							<td>23/11/1943</td>
							<td><a href="">5</a></td>
						</tr>
						<tr>
							<td><input type="checkbox"></td>
							<td><a href="">76163222712</a></td>
							<td><a href="">Jim Jefferey's Haulage LTD</a></td>
							<td>LS7 4QP</td>
							<td>James</td>
							<td>Jefferey</td>
							<td>07/02/1963</td>
							<td><a href="">14</a></td>
						</tr>
						<tr>
							<td><input type="checkbox"></td>
							<td><a href="">3623324227</a></td>
							<td><a href="">Amber Taxis</a></td>
							<td>LS3 2PS</td>
							<td>Mohammed</td>
							<td>Ali</td>
							<td>23/11/1943</td>
							<td><a href="">5</a></td>
						</tr>
						</tbody>
					</table>
				</div><!-- end table__wrapper -->

			</div><!-- end main -->

		</div><!-- end page-wrapper -->

<?php include 'includes/global-footer.php'; ?>
		
