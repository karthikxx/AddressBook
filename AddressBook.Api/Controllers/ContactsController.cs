using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core;
using System.Data.Entity.Infrastructure;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using AddressBook.Api.Filters;
using AddressBook.Api.Models;
using AddressBook.Api.Repositories;

namespace AddressBook.Api.Controllers
{
    public class ContactsController : ApiController
    {
        private readonly IRepository<Contact> contactRepository;

        public ContactsController(IRepository<Contact> contactRepository)
        {
            this.contactRepository = contactRepository ?? new ContactRepository( new AddressBookContext());
        }

        public ContactsController()
        {
            this.contactRepository = new ContactRepository(new AddressBookContext());
        }

        // GET: api/Contacts
        [EnableCors("*", "*", "*")]
        public List<Contact> GetContacts()
        {
            return contactRepository.GetAll();
        }

        // GET: api/Contacts/5
        [ResponseType(typeof(Contact))]
        [EnableCors("*", "*", "*")]
        public IHttpActionResult GetContact(int id)
        {
            var contact = contactRepository.GetById(id);
            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact);
        }

        // PUT: api/Contacts/5
        [ResponseType(typeof(void))]
        [EnableCors("*", "*", "*")]
        public IHttpActionResult PutContact(int id, Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contact.Id)
            {
                return BadRequest();
            }

            
            try
            {
                contactRepository.Update(contact);
            }
            catch (ObjectNotFoundException)
            {
                return NotFound();
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Contacts
       
        [ResponseType(typeof(Contact))]
        [EnableCors("*", "*", "*")]
        public IHttpActionResult PostContact(Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           contactRepository.Insert(contact);

            return CreatedAtRoute("DefaultApi", new {id = contact.Id}, contact);
        }

        // DELETE: api/Contacts/5
        [ResponseType(typeof(Contact))]
        [EnableCors("*", "*", "*")]
        public IHttpActionResult DeleteContact(int id)
        {
            try
            {
                var contact = contactRepository.Delete(id);
                return Ok(contact);

            }
            catch (ObjectNotFoundException)
            {
                return NotFound();
            }

        }

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        db.Dispose();
        //    }
        //    base.Dispose(disposing);
        //}

        //private bool ContactExists(int id)
        //{
        //    return db.Contacts.Count(e => e.Id == id) > 0;
        //}
    }
}