CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    telegram_id BIGINT UNIQUE,
    first_name VARCHAR(100),
    username VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS places (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    location VARCHAR(200),
    image_url TEXT,
    latitude NUMERIC(10,7),
    longitude NUMERIC(10,7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tours (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price NUMERIC(12,2) DEFAULT 0,
    duration VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hotels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    location VARCHAR(200),
    image_url TEXT,
    phone VARCHAR(50),
    website TEXT,
    latitude NUMERIC(10,7),
    longitude NUMERIC(10,7),
    rating NUMERIC(2,1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- RAS DEJEN TOUR — NORTH GONDAR PLACES
-- ============================================

INSERT INTO places
(name, description, location, image_url, latitude, longitude)
SELECT
'Ras Dashen',
'Explore Ras Dashen, the highest peak in Ethiopia and one of the highlights of the Simien Mountains.',
'Simien Mountains, North Gondar',
'/images/places/ras-dejen.jpg',
13.2364,
38.3711
WHERE NOT EXISTS (
  SELECT 1 FROM places WHERE name = 'Ras Dashen'
);

INSERT INTO places
(name, description, location, image_url, latitude, longitude)
SELECT
'Simien Mountains',
'Discover spectacular mountain landscapes, dramatic cliffs and unique wildlife in the Simien Mountains.',
'Simien Mountains, North Gondar',
'/images/places/simien-mountains.jpg',
13.1833,
38.0667
WHERE NOT EXISTS (
  SELECT 1 FROM places WHERE name = 'Simien Mountains'
);

INSERT INTO places
(name, description, location, image_url, latitude, longitude)
SELECT
'Bwahit Peak',
'Experience breathtaking mountain scenery from Bwahit Peak in the Simien Mountains.',
'Simien Mountains, North Gondar',
'/images/places/bwahit-peak.jpg',
13.2333,
38.1333
WHERE NOT EXISTS (
  SELECT 1 FROM places WHERE name = 'Bwahit Peak'
);

INSERT INTO places
(name, description, location, image_url, latitude, longitude)
SELECT
'Chenek',
'Visit Chenek for spectacular escarpment views and one of the most impressive landscapes in the Simien Mountains.',
'Simien Mountains, North Gondar',
'/images/places/chenek.jpg',
13.2167,
38.0500
WHERE NOT EXISTS (
  SELECT 1 FROM places WHERE name = 'Chenek'
);

INSERT INTO places
(name, description, location, image_url)
SELECT
'Jinbar Waterfall',
'Discover the beautiful Jinbar Waterfall surrounded by the dramatic scenery of the Simien Mountains.',
'Simien Mountains, North Gondar',
'/images/places/jinbar-waterfall.jpg'
WHERE NOT EXISTS (
  SELECT 1 FROM places WHERE name = 'Jinbar Waterfall'
);

INSERT INTO places
(name, description, location, image_url)
SELECT
'Buyit',
'Explore Buyit and enjoy the spectacular mountain scenery and landscapes of North Gondar.',
'Simien Mountains, North Gondar',
'/images/places/buyit-ras.jpg'
WHERE NOT EXISTS (
  SELECT 1 FROM places WHERE name = 'Buyit'
);

INSERT INTO places
(name, description, location, image_url)
SELECT
'Sankaber',
'Discover Sankaber, one of the scenic gateways and viewpoints of the Simien Mountains.',
'Simien Mountains, North Gondar',
'/images/places/sankaber.jpg'
WHERE NOT EXISTS (
  SELECT 1 FROM places WHERE name = 'Sankaber'
);

INSERT INTO places
(name, description, location, image_url)
SELECT
'Geech',
'Explore Geech and its spectacular highland landscapes, valleys and mountain views.',
'Simien Mountains, North Gondar',
'/images/places/geech.jpg'
WHERE NOT EXISTS (
  SELECT 1 FROM places WHERE name = 'Geech'
);

INSERT INTO places
(name, description, location, image_url)
SELECT
'Imet Gogo',
'Enjoy one of the most famous viewpoints in the Simien Mountains, with dramatic panoramic scenery.',
'Simien Mountains, North Gondar',
'/images/places/imet-gogo.jpg'
WHERE NOT EXISTS (
  SELECT 1 FROM places WHERE name = 'Imet Gogo'
);

INSERT INTO places
(name, description, location, image_url)
SELECT
'Debark',
'Explore Debark, the main gateway to the Simien Mountains and an important starting point for travelers.',
'Debark, North Gondar',
'/images/places/debark.jpg'
WHERE NOT EXISTS (
  SELECT 1 FROM places WHERE name = 'Debark'
);

-- ============================================
-- RAS DEJEN TOUR — DEBARK HOTELS
-- ============================================

INSERT INTO hotels
(name, description, location, phone, latitude, longitude)
SELECT
'Tsehay Zeleke Hotel',
'Comfortable hotel in Debark, serving travelers visiting the Simien Mountains.',
'Debark, North Gondar',
'+251 916 252000',
13.1561,
37.8981
WHERE NOT EXISTS (
  SELECT 1 FROM hotels WHERE name = 'Tsehay Zeleke Hotel'
);

INSERT INTO hotels
(name, description, location, phone, latitude, longitude)
SELECT
'Ras Dejen Hotel',
'Hotel in Debark located near the main route to the Simien Mountains.',
'Debark, North Gondar',
'+251 928 955551',
13.145207,
37.893868
WHERE NOT EXISTS (
  SELECT 1 FROM hotels WHERE name = 'Ras Dejen Hotel'
);

INSERT INTO hotels
(name, description, location, phone, latitude, longitude)
SELECT
'Jeramba Hotel',
'Hotel in Debark near the Simien Park area and a convenient base for travelers.',
'Debark, North Gondar',
NULL,
13.1528,
37.8986
WHERE NOT EXISTS (
  SELECT 1 FROM hotels WHERE name = 'Jeramba Hotel'
);

INSERT INTO hotels
(name, description, location, phone, latitude, longitude)
SELECT
'Simien Park Hotel',
'Long-established hotel in Debark serving visitors traveling to the Simien Mountains.',
'Debark, North Gondar',
'+251 918 788136',
13.152796,
37.898562
WHERE NOT EXISTS (
  SELECT 1 FROM hotels WHERE name = 'Simien Park Hotel'
);

INSERT INTO hotels
(name, description, location, phone, latitude, longitude)
SELECT
'Unique Landscape Hotel',
'Accommodation in Debark for travelers exploring the Simien Mountains and surrounding landscapes.',
'Kebele 03, Debark',
NULL,
NULL,
NULL
WHERE NOT EXISTS (
  SELECT 1 FROM hotels WHERE name = 'Unique Landscape Hotel'
);

INSERT INTO hotels
(name, description, location, phone, latitude, longitude)
SELECT
'Jasmine Hotel',
'Hotel in Debark providing accommodation for travelers visiting the Simien Mountains.',
'Kebele 01, Debark',
'+251 927 607948',
13.155596,
37.898584
WHERE NOT EXISTS (
  SELECT 1 FROM hotels WHERE name = 'Jasmine Hotel'
);

INSERT INTO hotels
(name, description, location, phone, latitude, longitude)
SELECT
'Sona Hotel',
'Hotel in Debark located on the main road and serving visitors to the Simien area.',
'Kebele 02, Debark',
'+251 581 170627',
NULL,
NULL
WHERE NOT EXISTS (
  SELECT 1 FROM hotels WHERE name = 'Sona Hotel'
);

INSERT INTO hotels
(name, description, location, phone, latitude, longitude)
SELECT
'Emitgogo Hotel',
'Hotel in Debark near the main road and a convenient stop for Simien travelers.',
'Kebele 02, Debark',
'+251 581 170634',
13.157583,
37.8981
WHERE NOT EXISTS (
  SELECT 1 FROM hotels WHERE name = 'Emitgogo Hotel'
);

INSERT INTO hotels
(name, description, location, phone, latitude, longitude)
SELECT
'Giant Lobelia Hotel',
'Hotel on the main road in Debark serving travelers visiting the Simien Mountains.',
'Main Road, Debark',
'+251 581 170560',
13.149127,
37.896485
WHERE NOT EXISTS (
  SELECT 1 FROM hotels WHERE name = 'Giant Lobelia Hotel'
);

INSERT INTO hotels
(name, description, location, phone, latitude, longitude)
SELECT
'Atse Tewodros Hotel',
'Hotel in Debark serving travelers visiting the Simien Mountains.',
'Debark, North Gondar',
'+251 911 918097',
13.136212,
37.892875
WHERE NOT EXISTS (
  SELECT 1 FROM hotels WHERE name = 'Atse Tewodros Hotel'
);
