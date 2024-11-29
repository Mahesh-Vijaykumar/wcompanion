import React from 'react';
import { useSafetyStore } from '../../store/safetyStore';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

const customIcon = new Icon({
  iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function ReportForm() {
  const addReport = useSafetyStore((state) => state.addReport);
  const deleteReport = useSafetyStore((state) => state.deleteReport);
  const reports = useSafetyStore((state) => state.reports);
  const [type, setType] = React.useState<'harassment' | 'theft' | 'unsafe_area' | 'other'>('harassment');
  const [description, setDescription] = React.useState('');
  const [location, setLocation] = React.useState({ lat: 0, lng: 0, address: 'Detecting location...' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [selectedReportId, setSelectedReportId] = React.useState<string | null>(null);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const address = await reverseGeocode(lat, lng); // Get address from a helper function.
        setLocation({ lat, lng, address });
      },
      () => {
        setLocation({
          lat: 51.5074,
          lng: -0.1278,
          address: 'London, UK'
        });
      }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Please provide a detailed description.');
      return;
    }
    setIsSubmitting(true);
    addReport({
      id: Date.now().toString(), // Simple unique ID generation
      userId: 'anonymous',
      type,
      description,
      location,
      timestamp: new Date(),
      status: 'pending',
      upvotes: 0,
      comments: []
    });
    setDescription('');
    setIsSubmitting(false);
    alert('Report submitted successfully!');
  };

  const handleDelete = async (reportId: string) => {
    setIsDeleting(true);
    deleteReport(reportId);
    setIsDeleting(false);
    alert('Report deleted successfully!');
  };

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      return data.display_name || 'Unknown location';
    } catch {
      return 'Unknown location';
    }
  };

  function LocationSelector() {
    const map = useMapEvents({
      click: async (e) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        const address = await reverseGeocode(lat, lng);
        setLocation({ lat, lng, address });
      }
    });

    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2 mb-6">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900">Report an Incident</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Incident Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="harassment">Harassment</option>
              <option value="theft">Theft</option>
              <option value="unsafe_area">Unsafe Area</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Please describe what happened..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              value={location.address}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
            />
            <p className="mt-1 text-sm text-gray-500">
              Click on the map to adjust the location.
            </p>
          </div>

          <div className="w-full h-64 rounded-md overflow-hidden">
            <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[location.lat, location.lng]} icon={customIcon} />
              <LocationSelector />
            </MapContainer>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>

        {/* Delete Report Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Delete a Report</h3>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-md">
                <div>
                  <p className="text-sm font-medium text-gray-900">{report.description}</p>
                  <p className="text-sm text-gray-500">{report.location.address}</p>
                </div>
                <button
                  onClick={() => handleDelete(report.id)}
                  disabled={isDeleting}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                  <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}