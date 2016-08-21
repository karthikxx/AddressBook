using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using AddressBook.Api.Models;

namespace AddressBook.Api.Repositories
{
    public class ContactRepository : IRepository<Contact>
    {
        private readonly AddressBookContext db;

        public ContactRepository()
        {
            
        }
        
        public ContactRepository(AddressBookContext db)
        {
            this.db = db;
        }

        public Contact GetById(int id)
        {
            return db.Contacts.Find(id);
        }

        public void Insert(Contact contact)
        {
            db.Contacts.Add(contact);
            db.SaveChanges();
        }

        public void Update(Contact contact)
        {
            db.Entry(contact).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(contact.Id))
                {
                    throw new ObjectNotFoundException();
                }
                else
                {
                    throw;
                }
            }
        }

        public Contact Delete(int id)
        {
            var contact = db.Contacts.Find(id);
            if (contact != null)
            {
                db.Contacts.Remove(contact);
                db.SaveChanges();
                return contact;
            }
            else
            {
                throw new ObjectNotFoundException("Contact not present is the data store");
            }
           
        }

        public List<Contact> GetAll()
        {
            return db.Contacts.ToList();
        }

        private bool ContactExists(int id)
        {
            return db.Contacts.Count(e => e.Id == id) > 0;
        }
    }
}