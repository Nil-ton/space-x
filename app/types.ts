interface Rocket {
    name: string;
    type: string;
    active: boolean;
    stages: number;
    boosters: number;
    cost_per_launch: number;
    success_rate_pct: number;
    first_flight: string;
    country: string;
    company: string;
    wikipedia: string;
    description: string;
    date_utc: string;
  }
  
  interface Launch {
    _id: string;
    flight_number: number;
    logo: {
      small: any;
      large: any;
    };
    name: string;
    success: any;
    webcast: any;
    date_utc: string;
    rocket: Rocket;
  }
  
  interface ApiResponse {
    results: Launch[];
    totalDocs: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }

  interface SearchOptions {
    name: string
    type: string
  }

  interface SearchFieldProps {
    search: SearchOptions[]
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setQuery: (query:SearchOptions) => void
    value: string
    id?: string
    setPage: (number:number) => void
  }

  interface RocketData {
    name: string;
    success: number;
    fail: number;
    color: string;
  }

  interface ChartBar {
    labels: string[];
    datasets: ChartBarDataset[];
  }
  
  interface ChartBarDataset {
    label: string;
    data: number[];
    backgroundColor: string[];
  }
  
  