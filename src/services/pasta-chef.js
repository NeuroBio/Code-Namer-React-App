const Pastas = [
    'Fettuccine',
    'Linguine',
    'Lasagna',
    'Pappardelle',
    'Spaghetti',
    'Spaghettini',
    'Tagliatelle',
    'Vermicelli',
    'Ziti',
    'Cavatelli',
    'Farfalle',
    'Fusilli',
    'Gnocchi',
    'Macaroni',
    'Penne',
    'Radiatori',
    'Rigatoni',
    'Rotelle',
    'Ravioli',
    'Tortellini',     
];

export class PastaChef {
    static bakePasta() {
        return Pastas[Math.floor(Math.random()*Pastas.length)];
    }
}