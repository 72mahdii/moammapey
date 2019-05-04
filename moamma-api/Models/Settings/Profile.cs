using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace moamma_api.Models.Settings
{
    public class Profile
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PersianName { get; set; }
        public string Category { get; set; }
        public string ImageAddress { get; set; }
    }
}
