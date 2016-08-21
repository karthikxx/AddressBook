using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AddressBook.Api.Models;

namespace AddressBook.Api.Repositories
{
    public interface IRepository<T> where T : class
    {
        T GetById(int id);

        void Insert(T entity);

        void Update(T entity);

        Contact Delete(int id);

        List<T> GetAll();
    }
}
