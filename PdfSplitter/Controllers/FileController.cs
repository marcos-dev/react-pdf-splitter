using GemBox.Pdf;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PdfSplitter.Models;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;

namespace PdfSplitter.Controllers
{
    /// <summary>
    /// Application Services for Files
    /// </summary>
    [Route("[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public FileController(IWebHostEnvironment env)
        {
            _env = env;
        }

        /// <summary>
        /// Get All Files 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        /// <summary>
        /// Create File .zip
        /// </summary>
        /// <param name="file"></param>
        [HttpPost]
        public IActionResult Post([FromForm] IFormFile file)
        {
            ComponentInfo.SetLicense("ARDC-LNLC-YKQ6-9UHJ");

            var fileName = file.FileName.Split("#")[1];
            var id = file.FileName.Split("#")[0];

            var fileSavePath = Path.Combine($"{_env.ContentRootPath}\\Uploads\\", fileName);

            if (System.IO.File.Exists(fileSavePath))
                System.IO.File.Delete(fileSavePath);

            using (var stream = new FileStream(fileSavePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            var fileNameWithoutExt = Path.GetFileNameWithoutExtension(fileSavePath);

            var zippath = Path.Combine($"{_env.ContentRootPath}\\Uploads\\", $"{fileNameWithoutExt}.zip");

            // Open source PDF file and create a destination ZIP file.
            using var source = PdfDocument.Load(fileSavePath);
            using var archiveStream = System.IO.File.OpenWrite(zippath);
            using var archive = new ZipArchive(archiveStream, ZipArchiveMode.Create, leaveOpen: true);
            for (int index = 0; index < source.Pages.Count; index += 2)
            {
                // Create new ZIP entry for each source document page.
                var entry = archive.CreateEntry($"{fileNameWithoutExt}{index + 1}.pdf");

                // Open ZIP entry stream.
                using (var entryStream = entry.Open())
                // Create destination document.
                using (var destination = new PdfDocument())
                {
                    // Clone source document page to destination document.
                    destination.Pages.AddClone(source.Pages[index]);
                    if (source.Pages.Count > index + 1)
                        destination.Pages.AddClone(source.Pages[index + 1]);

                    // Save destination document to ZIP entry stream.
                    destination.Save(entryStream);
                }
            }

            source.Close();

            if (System.IO.File.Exists(fileSavePath))
            {
                source.Close();
                System.IO.File.Delete(fileSavePath);
            }


            var result = new UploadFileResult()
            {
                Id = id,
                Url = "uploads/" + fileNameWithoutExt + ".zip"
            };

            return Ok(result);
        }

        /// <summary>
        /// Delete File
        /// </summary>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

        }
    }
}
