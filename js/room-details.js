const hotels = {

    bangalore: {
        name: "Grand Palace Hotel",
        city: "Bangalore",
        rating: "⭐⭐⭐⭐⭐",
        price: "₹3500 / Night",
        image: "images/hotelpic1.jpg",
        description: "Experience luxury and comfort in the heart of Bangalore with spacious rooms, premium amenities and exceptional hospitality."
    },

    goa: {
        name: "Ocean View Resort",
        city: "Goa",
        rating: "⭐⭐⭐⭐☆",
        price: "₹4200 / Night",
        image: "images/hotelpic2.jpg",
        description: "Enjoy breathtaking sea views, private beach access and unforgettable holiday experiences."
    },

    ooty: {
        name: "Mountain Retreat",
        city: "Ooty",
        rating: "⭐⭐⭐⭐⭐",
        price: "₹2900 / Night",
        image: "images/hotelpic3.jpg",
        description: "Relax amidst beautiful hills, fresh air and peaceful surroundings."
    },

    delhi: {
        name: "City Lights Hotel",
        city: "Delhi",
        rating: "⭐⭐⭐☆☆",
        price: "₹2500 / Night",
        image: "images/hotelpic4.jpg",
        description: "Comfortable rooms with easy access to famous attractions and business centres."
    },

    mumbai: {
        name: "Marina Bay Hotel",
        city: "Mumbai",
        rating: "⭐⭐⭐⭐⭐",
        price: "₹4500 / Night",
        image: "images/hotelpic5.jpg",
        description: "Luxury stay in the city of dreams with premium services and sea views."
    },

    hyderabad: {
        name: "Royal Comfort Hotel",
        city: "Hyderabad",
        rating: "⭐⭐⭐⭐☆",
        price: "₹3200 / Night",
        image: "images/hotelpic6.jpg",
        description: "Traditional hospitality blended with modern comfort."
    },

    jaipur: {
        name: "Heritage Palace Hotel",
        city: "Jaipur",
        rating: "⭐⭐⭐⭐⭐",
        price: "₹3800 / Night",
        image: "images/hotelpic7.jpg",
        description: "Experience royal living in the Pink City."
    },

    chennai: {
        name: "Bayview Hotel",
        city: "Chennai",
        rating: "⭐⭐⭐⭐☆",
        price: "₹3100 / Night",
        image: "images/hotelpic8.jpg",
        description: "Beautiful coastal views with luxurious accommodation."
    },

    coorg: {
        name: "Coorg Valley Resort",
        city: "Coorg",
        rating: "⭐⭐⭐⭐⭐",
        price: "₹4000 / Night",
        image: "images/hotelpic9.jpg",
        description: "Stay amidst lush green coffee plantations and scenic beauty."
    },

    manali: {
        name: "Himalayan Retreat",
        city: "Manali",
        rating: "⭐⭐⭐⭐☆",
        price: "₹3600 / Night",
        image: "images/hotelpic10.jpg",
        description: "Enjoy breathtaking Himalayan views and cosy luxury rooms."
    }

};

const params = new URLSearchParams(window.location.search);

const hotel = params.get("hotel");

if (hotels[hotel]) {

    document.getElementById("hotelName").innerHTML = hotels[hotel].name;

    document.getElementById("hotelCity").innerHTML = hotels[hotel].city;

    document.getElementById("hotelRating").innerHTML = hotels[hotel].rating;

    document.getElementById("hotelPrice").innerHTML = hotels[hotel].price;

    document.getElementById("hotelDescription").innerHTML = hotels[hotel].description;

    document.getElementById("hotelImage").src = hotels[hotel].image;

}
else {

    document.getElementById("hotelName").innerHTML = "Grand Palace Hotel";

    document.getElementById("hotelCity").innerHTML = "Bangalore";

    document.getElementById("hotelRating").innerHTML = "⭐⭐⭐⭐⭐";

    document.getElementById("hotelPrice").innerHTML = "₹3500 / Night";

    document.getElementById("hotelDescription").innerHTML = "Experience luxury and comfort.";

    document.getElementById("hotelImage").src = "images/hotelpic1.jpg";


}

function goToRooms() {

    const roomSection = document.getElementById("rooms");

    roomSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}