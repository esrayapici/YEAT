/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primaryOrange: '#FF7043',
                secondaryGreen: '#8BC34A',
                lightGreen: '#C8E6C9',
                warmNeutral: '#FFF8E1',
                accentBrown: '#6D4C41',
                lightGray: '#FAFAFA',
                accentRed: '#FF5252',
                movuliu: '#550c55',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}