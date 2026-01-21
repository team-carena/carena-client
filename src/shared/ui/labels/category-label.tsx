interface CategoryLabelProps {
	label: string;
}

export const CategoryLabel = ({ label }: CategoryLabelProps) => {
	return <h3 className="head02-b-16 text-left text-primary-700">{label}</h3>;
};
