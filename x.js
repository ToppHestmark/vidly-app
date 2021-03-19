// Post /api/returns {customerId, MovieId}

// Return 401 if clients is not logged in
// return 400 if customer ID is not provided
// return 400 if movieId is not provided
// return 404 if no rental found for this customer/movie
// return 400 if rentals has already been processed
// return 200 if valid request
// set the return date
// calculate the rental fee
// Increase the stock
// return summary of the rental
