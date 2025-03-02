const LoadingScreen = () => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white">
			<svg
				className="animate-spin h-16 w-16 text-white"
				viewBox="0 0 50 50"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					className="opacity-25"
					cx="25"
					cy="25"
					r="20"
					stroke="currentColor"
					strokeWidth="5"
				/>
				<path
					className="opacity-75"
					fill="currentColor"
					d="M 25 5 A 20 20 0 0 1 45 25 L 40 25 A 15 15 0 0 0 25 10 Z"
				/>
			</svg>
		</div>
	)
}

export default LoadingScreen
