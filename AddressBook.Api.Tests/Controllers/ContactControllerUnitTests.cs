using System;
using System.Web.Http;
using System.Web.Http.Results;
using AddressBook.Api.Controllers;
using AddressBook.Api.Models;
using NUnit.Framework;

namespace AddressBook.Api.Tests.Controllers
{
    [TestFixture]
    public class ContactControllerUnitTests
    {
        [Test]
        public void GetContactWithValidId_ReturnsOK()
        {
            //Arrage
            //var contactController = new ContactsController();

            
            //Act
            IHttpActionResult actionResult = contactController.GetContact(1);
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
            var contactController = new ContactsController();

            //Act
            IHttpActionResult actionResult = contactController.GetContact(999);

            //Assert
            Assert.IsInstanceOf<NotFoundResult>(actionResult);
        }

    }
}
