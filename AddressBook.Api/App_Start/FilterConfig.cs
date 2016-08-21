using System.Web;
using System.Web.Mvc;
using AddressBook.Api.Filters;

namespace AddressBook.Api
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
