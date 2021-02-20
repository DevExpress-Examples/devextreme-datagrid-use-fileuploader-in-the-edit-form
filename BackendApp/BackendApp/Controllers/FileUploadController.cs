using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;

namespace BackendApp.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class FileUploadController : ControllerBase {
        private IWebHostEnvironment _hostEnvironment;

        public FileUploadController(IWebHostEnvironment environment) {
            _hostEnvironment = environment;
        }

        [HttpPost]
        public IActionResult Post() {
            IFormFileCollection files = Request.Form.Files;
            string uniqueFileName = "";

            if (files.Count > 0) {
                var file = files[0];
                uniqueFileName = string.Format("{0}{1}", Guid.NewGuid(), Path.GetExtension(file.FileName));

                try {
                    var path = Path.Combine(_hostEnvironment.WebRootPath, "images/employees/" + uniqueFileName);

                    using(Stream fileStream = new FileStream(path, FileMode.Create)) {
                        file.CopyTo(fileStream);
                    }
                } catch {
                    return BadRequest("Failed to save a file on the server");
                }
            }

            return Ok(uniqueFileName);
        }
    }
}
