interface CategoryLabelProps {
	label: string;
}

export const CategoryLabel = ({ label }: CategoryLabelProps) => {
	return <h3 className="head02-b-16 text-left">{label}</h3>;
};
