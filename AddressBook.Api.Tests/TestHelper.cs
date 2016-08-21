using AddressBook.Api.Models;

namespace AddressBook.Api.Tests
{
    public static class TestHelper
    {
        public static Contact NewContact = new Contact
        {
            FirstName = Faker.Name.First(),
            LastName = Faker.Name.Last(),
            Email = Faker.Internet.Email(),
            HomePhone = Faker.Phone.Number(),
            MobilePhone = Faker.Phone.Number(),
            WorkPhone = Faker.Phone.Number()
        };

        public static Contact ExistingContact = new Contact
        {
            Id =1,
            FirstName = Faker.Name.First(),
            LastName = Faker.Name.Last(),
            Email = Faker.Internet.Email(),
            HomePhone = Faker.Phone.Number(),
            MobilePhone = Faker.Phone.Number(),
            WorkPhone = Faker.Phone.Number()
        };

        public static Contact InValidContact = new Contact
        {
            HomePhone = Faker.Phone.Number(),
            MobilePhone = Faker.Phone.Number(),
            WorkPhone = Faker.Phone.Number()
        };
    }
}