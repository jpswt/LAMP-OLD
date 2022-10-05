{
	/* <OrgInfo
	key={org.name}
	id={org.username}
	username={org.username}
	name={org.name}
	email={org.email}
	address={org.address}
	phone={org.phone}
	handleOpen={handleOpen}
	handleClick={handleClick}
	selectOrg={selectOrg}
/>; */
}
const [acceptedData, setAcceptedData] = useState(accepted);
const handleRemove = (id) => {
	console.log(id);
	const newData = acceptedData.filter((d) => d.id !== id);
	setAcceptedData(
		newData,
		localStorage.setItem('data', JSON.stringify(newData))
	);
};

useEffect(() => {
	const newData = localStorage.getItem('data');
	if (newData) setAcceptedData(JSON.parse(newData));
}, [acceptedData]);
