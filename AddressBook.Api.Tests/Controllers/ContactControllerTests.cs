using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Core;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Mvc;
using AddressBook.Api.Controllers;
using AddressBook.Api.Models;
using AddressBook.Api.Repositories;
using Moq;
using Newtonsoft.Json;
using NUnit.Framework;

namespace AddressBook.Api.Tests.Controllers
{
    //http://www.asp.net/web-api/overview/testing-and-debugging/unit-testing-controllers-in-web-api
    [TestFixture]
    public class ContactControllerTests
    {
        [Test]
        public void GetContactWithValidId_ReturnsOK()
        {
            //Arrage
            var mockRepo = new Mock<IRepository<Contact>>();
            mockRepo.Setup(m => m.GetById(It.IsAny<int>())).Returns(new Contact() {Id = 1});

            //Act
            var contactController = new ContactsController(mockRepo.Object);
            IHttpActionResult actionResult = contactController.GetContact(1);

            //Act
            var contentResult = actionResult as OkNegotiatedContentResult<Contact>;

            //Assert
            Assert.IsNotNull(contentResult);
            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual(1, contentResult.Content.Id);
        }

        [Test]
        public void GetContactWithInValidId_ReturnsNotFound()
        {
            //Arrage
            var mockRepo = new Mock<IRepository<Contact>>();
            mockRepo.Setup(m => m.GetById(It.IsAny<int>())).Returns((Contact) null);
            

            //Act
            var contactController = new ContactsController(mockRepo.Object);
            IHttpActionResult actionResult = contactController.GetContact(99);

            //Assert
            Assert.IsInstanceOf<NotFoundResult>(actionResult);
        }

        [Test]
        public void GetAllContacts_ContactsExists_ReturnsContacts()
        {
            //Arrage
            var mockRepo = new Mock<IRepository<Contact>>();
            mockRepo.Setup(m => m.GetAll()).Returns(new List<Contact> { new Contact() { Id = 1 }});
            var contactController = new ContactsController(mockRepo.Object);

            //Act
            var contacts = contactController.GetContacts();

            //Assert
            Assert.IsInstanceOf<List<Contact>>(contacts);
            Assert.True(contacts.Count() ==1);
        }

        [Test]
        public void GetAllContacts_ContactsDoesNotExists_ReturnsNoContacts()
        {
            //Arrage
            var mockRepo = new Mock<IRepository<Contact>>();
            mockRepo.Setup(m => m.GetAll()).Returns(new List<Contact> { });
            var contactController = new ContactsController(mockRepo.Object);

            //Act
            var contacts = contactController.GetContacts();

            //Assert
            Assert.IsInstanceOf<List<Contact>>(contacts);
            Assert.True(contacts.Count == 0);
        }
        [Test]
        public void CreateContactWithValidData_ReturnsContact()
        {
            //Arrage
            var mockRepo = new Mock<IRepository<Contact>>();
            mockRepo.Setup(m => m.Insert(It.IsAny<Contact>()));
            var contactController = new ContactsController(mockRepo.Object);

            //Act
            IHttpActionResult actionResult = contactController.PostContact(TestHelper.NewContact);
            var createdResult = actionResult as CreatedAtRouteNegotiatedContentResult<Contact>;

            //Assert
            //The Post method calls CreatedAtRoute to return an HTTP 201 response with a URI in the Location header. In the unit test, verify that the action sets the correct routing values.
            Assert.IsNotNull(createdResult);
            Assert.AreEqual("DefaultApi", createdResult.RouteName);
            Assert.IsNotNull(createdResult.RouteValues["id"]);
            Assert.AreEqual(TestHelper.NewContact.Email, createdResult.Content.Email);

        }

        [Test]
        public void CreateContactWithInvalidData_ReturnsBadRequest()
        {
            //Arrage
            var mockRepo = new Mock<IRepository<Contact>>();
            mockRepo.Setup(m => m.Insert(It.IsAny<Contact>()));
            var contactController = new ContactsController(mockRepo.Object);

            var invalidContact = TestHelper.InValidContact;
            var validationContext = new ValidationContext(invalidContact, null, null);
            var validationResults = new List<ValidationResult>();
            Validator.TryValidateObject(invalidContact, validationContext, validationResults, false);

            foreach (var validationResult in validationResults)
            {
                contactController.ModelState.AddModelError(validationResult.MemberNames.First(), validationResult.ErrorMessage);
            }

            //Act
            IHttpActionResult actionResult = contactController.PostContact(TestHelper.InValidContact);

            //Assert
            Assert.IsNotNull(actionResult);
            Assert.IsInstanceOf<InvalidModelStateResult>(actionResult);

        }

        [Test]
        public void UpdateContactWithValidData_ReturnsNoContent()
        {
            //Arrage
            var mockRepo = new Mock<IRepository<Contact>>();
            mockRepo.Setup(m => m.Update(It.IsAny<Contact>()));
            var contactController = new ContactsController(mockRepo.Object);
          
            //Act
            var updatedResult = contactController.PutContact(1, TestHelper.ExistingContact);
            var response = updatedResult as System.Web.Http.Results.StatusCodeResult;

            //Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.NoContent, response.StatusCode);
        }

        [Test]
        public void UpdateContactWithInValidData_ReturnsBadRequest()
        {
            //Arrage
            var mockRepo = new Mock<IRepository<Contact>>();
            mockRepo.Setup(m => m.Update(It.IsAny<Contact>()));
            var contactController = new ContactsController(mockRepo.Object);

            //Act
            var updatedResult = contactController.PutContact(2, TestHelper.ExistingContact);

            //Assert
            Assert.IsNotNull(updatedResult);
            Assert.IsInstanceOf<BadRequestResult>(updatedResult);
        }

        [Test]
        public void DeleteExistingContact_ReturnsOk()
        {
            //Arrage
            var mockRepo = new Mock<IRepository<Contact>>();
            mockRepo.Setup(m => m.Delete(It.IsAny<int>())).Returns(TestHelper.ExistingContact);
            var contactController = new ContactsController(mockRepo.Object);

            //Act
            var deleteActionResult = contactController.DeleteContact(1);
            var deletedResult = deleteActionResult as OkNegotiatedContentResult<Contact>;

            //Assert
            Assert.IsNotNull(deletedResult);
            Assert.IsNotNull(deletedResult.Content);
            Assert.AreEqual(1, deletedResult.Content.Id);
        }

        [Test]
        public void DeleteNonExistingContact_ReturnsNotFound()
        {
            //Arrage
            var mockRepo = new Mock<IRepository<Contact>>();
            mockRepo.Setup(m => m.Delete(It.IsAny<int>())).Throws<ObjectNotFoundException>();
            var contactController = new ContactsController(mockRepo.Object);

            //Act
            var deleteActionResult = contactController.DeleteContact(1);

            //Assert
            Assert.IsNotNull(deleteActionResult);
            Assert.IsInstanceOf<NotFoundResult>(deleteActionResult);
        }
    }
}
