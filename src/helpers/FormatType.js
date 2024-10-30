const formatType = (type) => {
	switch (type) {
	  case 'Feu':
		return '#ff7043'; // red lighten-1
	  case 'Eau':
		return '#42a5f5'; // blue lighten-1
	  case 'Plante':
		return '#66bb6a'; // green lighten-1
	  case 'Insecte':
		return '#8d6e63'; // brown lighten-1
	  case 'Normal':
		return '#eeeeee'; // grey lighten-3
	  case 'Vol':
		return '#90caf9'; // blue lighten-3
	  case 'Poison':
		return '#b39ddb'; // deep-purple accent-1
	  case 'Fée':
		return '#f8bbd0'; // pink lighten-4
	  case 'Psy':
		return '#5e35b1'; // deep-purple darken-2
	  case 'Electrik':
		return '#d4e157'; // lime accent-1
	  case 'Combat':
		return '#ff7043'; // deep-orange
	  default:
		return '#bdbdbd'; // grey
	}
  };
  
  export default formatType;
  