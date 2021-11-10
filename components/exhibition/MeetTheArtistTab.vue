<template>
    <div>
        <div v-for="artist in artists" :key="artist.title">
            <div class="mb-10">
                <h1 class="text-lg font-semibold mb-5">{{ artist.title }}</h1>
                <!-- class="object-cover h-64 w-full" -->
                    <img  :src="require(`~/assets/artists/${artist.image}`)"/>
                    <div>
                        <p class="font-bold text-base my-2">EDUCATION</p>
                        <p class="text-xs my-2">{{ artist.education }}</p>
                    </div>
                    <div v-if="artist.showless">
                         <div v-for="resume in artist.resume.slice(0,1)" :key="resume" >
                            <p class="font-bold text-base my-2">{{ resume.title }}</p>
                            <p v-for="work in resume.works" :key="work" class="text-xs my-2" >
                                {{ work }}
                            </p>
                        </div>
                    </div>
                    <div v-else>
                        <div v-for="resume in artist.resume" :key="resume" >
                            <p class="font-bold text-base my-2">{{ resume.title }}</p>
                            <p v-for="work in resume.works" :key="work" class="text-xs my-2" >
                                {{ work }}
                            </p>
                        </div>
                    </div>
                    <p class="text-xs cursor-pointer font-bold" @click="artist.showless = !artist.showless">{{ artist.showless ? 'Show more...' : 'Show less'}}</p>
                <div class="my-5 flex flex-row">
                    <img class="w-10 cursor-pointer" src="~/assets/icons/social/facebook-outline.svg"/>
                    <img class="w-10 cursor-pointer" src="~/assets/icons/social/twitter-outline.svg"/>
                    <a :href="artist.instagram" target="_blank"> 
                       <img class="w-10 cursor-pointer" src="~/assets/icons/social/instagram-outline.svg">
                    </a>
                    <img class="w-10 cursor-pointer" src="~/assets/icons/social/globe-outline.svg"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                artists:[
                    {
                        image:'WidiWardani.jpg',
                        title: 'Widi Wardani Purama',
                        showless:'false',
                        education:'Universitas Pendidikan Indonesia',
                        resume: [
                            {
                                title:'SOLO EXHIBITION',
                                works:[
                                    '2020 CONTENTION, curated by Zakarias S. Soeteja, M.Sn, Komuji, Bandung, Indonesia',
                                    '2020 SOMETHING IN THE OTHER, curated by Rainda, Virtual Exhibition',
                                    '2021 CONTENTION, curated by Zakarias S. Soeteja, M.Sn, de Braga by Artotel, Bandung'
                                ]
                            },
                            {
                                title:'SELECTED GROUP EXHIBITIONS',
                                works:[
                                    '2021 SELARAS ART, (upcoming event)',
                                    '2021 ART JAKARTA, (upcoming event)',
                                    '2021 CRYPTO ART, Rachel Gallery, Virtual Exhibition (upcoming event)',
                                    '2021 SHIFTING SPACES, Orbital Dago, Bandung',
                                    '2020 RE - BUNG #BIJABA2, Thee Huis Gallery, Bandung, Indonesia',
                                    '2020 PAMERAN DARI RUMAH, Kemenparekraf RI',
                                    '2019 GUYUB RUPA 9 RONG, UNS, Semarang, Indonesia',
                                    '2019 FORGET, Thee Huis Gallery, Bandung, Indonesia',
                                    '2019 KONTINU DISKONTINU, UPI, Bandung, Indonesia',
                                    '2019 PEKAN SENI 3, UNJ, Jakarta, Indonesia',
                                    '2018 FLORES EDUCATION CHARITY, Hotel Pavilijoen, Bandung, Indonesia',
                                    '2018 AGNITIA, Thee Huis Gallery, Bandung, Indonesia'
                                ]
                            },
                            {
                                title:'COMMISSION WORK',
                                works:[
                                    '2020 MURAL, (CREATICITY), Sukabumi, Cirebon, Bogor, Kuningan, Garut',
                                    '2020 MURAL, PUSDIKPOM, Bandung',
                                    '2019 MURAL, West Java Festifal, Gedung Sate, Bandung',
                                    '2019 MURAL, Gapura Cibuntu, Bandung',
                                    '2019 MURAL, Pesawat Hut TNI AU, Husein Sastranegara, Bandung',
                                    '2019 MURAL, Top Coffe “Muda Kaya Karya”, Gedung PGN, Bandung',
                                    '2018 MURAL, Authentic Fest, Bandung',
                                    '2018 MURAL, D’three fitness, Bandung',
                                    '2018 ILLUSTRATOR, KOMIK “SI LOKO”, PT KAI'
                                ]
                            },
                            {
                                title:'RESIDENSI',
                                works:[
                                    '2021 The Inhabitants : Adopt A Project (Residensi), Indeks, Jepang'
                                ]
                            },
                            {
                                title:'AWARDS',
                                works:[
                                    '2019 MURAL, 3RD Place “Angkasa Pura”, Bandung'
                                ]
                            },
                            {
                                title:'VOLUNTEERING FOR SOCIETY',
                                works:[
                                    '2019 MURAL, Street Art Dakwah, Cibunut, Bandung',
                                    '2019 MURAL, Cinambo, Bandung 2017 MURAL, Cibunut, Bandung',
                                    '2016 MURAL, Baksil, Bandung'
                                ]
                            },
                            {
                                title:'OTHERS',
                                works:[
                                    '2020 – 2021 Bekerja di Kultura Creative studio sebagai designer',
                                    '2019 - 2020 Exhibition Guide Selasar Sunaryo Art Space',
                                    '2019 Exhibition Guide BaCAA',
                                    '2019 Show Management Art Jakarta',
                                    '2018 Artisan Agung Fitriana “Visible Of Feeling”'
                                ]
                            }
                        ]
                        ,
                        instagram:'https://www.instagram.com/widwar/'
                    },
                    {
                        image:'SandyTisa.jpg',
                        title: 'Sandy Tisa',
                        showless:'false',
                        education:'Sekolah Tinggi Seni Indonesia Bandung',
                        resume:[
                            {
                                title:'Pameran Tungga',
                                works:[
                                    '2021 Landscape of Life, Artsphere x Boxliving, Jakarta',
                                    '2020 Pameran Tunggal Berdua, Satu Ruang Dua Pintu, Galeri Ruang Dini, Bandung',
                                    '2014 Pameran Wajah Wajah Berkabung, Show Room Invalid Urban, Taman Sari Bandung'
                                ],
                            },
                            {
                                title:'Pameran Bersama',
                                works:[
                                    '2021 ArtCare Indonesia, Seniman BerbagiI Dimasa Pandemi, Yogya National Museum, Yogyakarta Islamic Art, IsaArt and Design, Wisma BNI 46 Jakarta.',
                                    '2020 Mantra, Drawingclas 212, Thee Huise Gallery, Dago Bandung Pameran re-Bung, Thee Huise Gallery, Dago Bandung',
                                    '2019 Bridging, Pameran Bersama Alumni ISBI Bandung. Galeri 212 ISBI Bandung Bienalle Jawa Barat, Thee Huise Gallery, Dago Bandung Anomali Experimental Drawing, Galeri 212 Bandung',
                                    '2018 Pameran Diatas Kertas, Nort Art Space, Jakarta Diversity Of Indonesia Contemporary Art Shinjuku Eco Gallery Japan',
                                    '2017 The Representation Of Art In Asia, Shinjuku Eco Gallery Japan Posisi SItuasi, Thee Huise Gallery Bandung',
                                    '2016 BBNK, Galeri Rumah Proses, Bandung',
                                    '2014 Festival Kesenian Indonesia ISI Yogyakarta BOrless Sign, Assumu Gallery Japan',
                                    '2013 Open Studio Galeri 212 Bandung',
                                    '2012 Biennale Jakarta Maximum City, Galeri Nasional Indonesia, Jakarta Drawing Class DOGMA, Galeri Rumah Proses Bandung Autotaksonomi, Pameran Bersam 3 Institusi, Galeri Kita, Bandung Experiment Creative, Galeri 212 Bandung Festival Kesenian Indonesia ISI Surakarta Solo',
                                    '2011 Mahotsawa Surabaya',
                                    '2010 Inisiasi Galleri 212 STSI Bandung',
                                    '2009 Visual Attact, Gedung Seni Rupa STSI Bandun'
                                ]
                            }
                        ],
                        instagram:'https://www.instagram.com/sandytisa/'
                    }
                ]
            }
        }
    }
</script>