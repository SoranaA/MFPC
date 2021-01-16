using MFPC_server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MFPC_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganisationsController : ControllerBase
    {
        private readonly _DbContext _context;

        public OrganisationsController(_DbContext context)
        {
            _context = context;
        }

        // GET: api/Organisations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Organisation>>> GetOrganisations()
        {
            return await _context.Organisations.ToListAsync();
        }

        [HttpGet("users/{userId}")]
        public async Task<ActionResult<IEnumerable<Organisation>>> GetUserOrganisations(int userId)
        {
            var organisations = await _context.Organisations
                .Join(_context.Memberships,
                    o => o.Id,
                    m => m.OrganisationId,
                    (o, m) => new
                    {
                        Id = o.Id,
                        Name = o.Name,
                        Address = o.Address,
                        UserId = m.UserId
                    })
                .Where(m => m.UserId == userId)
                .ToListAsync();

            var userOrganisations = new List<Organisation>();

            foreach (var o in organisations)
            {
                userOrganisations.Add(new Organisation()
                {
                    Id = o.Id,
                    Name = o.Name,
                    Address = o.Address,
                });
            }

            return userOrganisations;
        }

        // GET: api/Organisations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Organisation>> GetOrganisation(int id)
        {
            var organisation = await _context.Organisations.FindAsync(id);

            if (organisation == null)
            {
                return NotFound();
            }

            return organisation;
        }

        // PUT: api/Organisations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrganisation(int id, Organisation organisation)
        {
            if (id != organisation.Id)
            {
                return BadRequest();
            }

            _context.Entry(organisation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrganisationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Organisations
        [HttpPost]
        public async Task<ActionResult<Organisation>> PostOrganisation(Organisation organisation)
        {
            if (!OrganisationExists(organisation.Id))
            {
                _context.Organisations.Add(organisation);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetOrganisation", new {id = organisation.Id}, organisation);
            }
            else
            {
                return UnprocessableEntity();
            }
        }

        // DELETE: api/Organisations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Organisation>> DeleteOrganisation(int id)
        {
            var organisation = await _context.Organisations.FindAsync(id);
            if (organisation == null)
            {
                return NotFound();
            }

            _context.Organisations.Remove(organisation);
            await _context.SaveChangesAsync();

            return organisation;
        }

        private bool OrganisationExists(int id)
        {
            return _context.Organisations.Any(e => e.Id == id);
        }
    }
}