using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using AddressBook.Api.Models;

namespace AddressBook.Api
{
    public class AddressBookContext :DbContext
    {
        public DbSet<Contact> Contacts { get; set; }
    }
}