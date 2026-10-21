// the Intl object is the namespace object for the ECMAScript internatiolization API
// it provides a wide range of locale and culture sensitive data and operations

// helps with:
/*
    Getting info about a locale,
    Formatting data,
    Collation,
    Selecting plural forms,
    Segmenting text,
    Getting the displayed name for currencies, languages, scripts, regions and time zones and ...
*/

// common approach, step 1, constructor formatter object. step 2, use it to format format numbers, inputs, et cetra
// first arg, is a string with BCP 47 language tag or an Intl.Locale instance
const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

console.log(price.format(5.259)); // $5.26


// the first arg could also be an Intl.Locale instance
const locale1 = new Intl.Locale("en-US");
price = new Intl.NumberFormat(locale1);

