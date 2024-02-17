export default function MovieDetail ({
	params,
}: { params: { id: string }}) {
	return (
		<div className="generic-container">
			{params.id}
		</div>
	);
}