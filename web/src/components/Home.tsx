import { FunctionComponent, useState } from "react";
import "./Home.css";
const Home: FunctionComponent<{ history: any }> = ({ history }) => {
	const [searchString, setSearch] = useState("");

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					history.push(`/search/artist/${searchString}`);
				}}
			>
				<label>
					Artist:
					<input
						type="text"
						value={searchString}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</label>
				<input type="submit" value="submit form" />
			</form>
		</div>
	);
};

export default Home;
