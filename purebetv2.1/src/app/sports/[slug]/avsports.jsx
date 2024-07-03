
export default function Avsports() {
    return (
      <div className="bg-black  border-2 mx-3 rounded-lg border-[#222222] text-white p-6 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-2 mb-4">
            <BusIcon className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Soccer</h1>
          </div>
          <p className="text-muted-foreground mb-6">Top Leagues</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#1c1c1c] rounded-md">
              <div>
                <h2 className="text-lg font-semibold">Germany 2 Bundesliga</h2>
                <p className="text-sm text-muted-foreground">6 events</p>
              </div>
              <div className="flex items-center space-x-2">
                <StarIcon className="w-5 h-5 text-muted-foreground" />
                <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#1c1c1c] rounded-md">
              <div>
                <h2 className="text-lg font-semibold">England Premier League</h2>
                <p className="text-sm text-muted-foreground">6 events</p>
              </div>
              <div className="flex items-center space-x-2">
                <StarIcon className="w-5 h-5 text-muted-foreground" />
                <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#1c1c1c] rounded-md">
              <div>
                <h2 className="text-lg font-semibold">Germany 2 Bundesliga</h2>
                <p className="text-sm text-muted-foreground">6 events</p>
              </div>
              <div className="flex items-center space-x-2">
                <StarIcon className="w-5 h-5 text-muted-foreground" />
                <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#1c1c1c] rounded-md">
              <div>
                <h2 className="text-lg font-semibold">Germany 2 Bundesliga</h2>
                <p className="text-sm text-muted-foreground">6 events</p>
              </div>
              <div className="flex items-center space-x-2">
                <StarIcon className="w-5 h-5 text-muted-foreground" />
                <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  function BusIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 6v6" />
        <path d="M15 6v6" />
        <path d="M2 12h19.6" />
        <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
        <circle cx="7" cy="18" r="2" />
        <path d="M9 18h5" />
        <circle cx="16" cy="18" r="2" />
      </svg>
    )
  }
  
  
  function ChevronRightIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    )
  }
  
  
  function StarIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  }