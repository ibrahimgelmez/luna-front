'use client';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import NewSidebar from '../components/NewSideBar/page';
import { useAuth } from '@/context/AuthContext';

dayjs.locale('tr');

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [currentWeek, setCurrentWeek] = useState(
    dayjs().startOf('week').add(1, 'day')
  );
  const [noteInput, setNoteInput] = useState('');
  const [error, setError] = useState(null);
  const { bearerKey } = useAuth();

  const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Pzr'];

  useEffect(() => {
    // Yerel depolamadan notları yükle
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || {};
    setNotes(storedNotes);

    // API'den takvim verilerini çek
    const fetchCalendars = async () => {
      try {
        const response = await fetch('http://217.195.207.244:8081/calendars', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Takvim verileri alınamadı');
        const data = await response.json();
        const apiNotes = data._embedded.calendars.reduce((acc, item) => {
          const date = dayjs(item.date).format('YYYY-MM-DD');
          acc[date] = acc[date]
            ? [
                ...acc[date],
                {
                  id: item.id,
                  todo: item.todo,
                  date: item.date,
                  checked: item.checked,
                },
              ]
            : [
                {
                  id: item.id,
                  todo: item.todo,
                  date: item.date,
                  checked: item.checked,
                },
              ];
          return acc;
        }, {});
        // Yerel notlarla API notlarını birleştir
        setNotes((prev) => ({ ...prev, ...apiNotes }));
      } catch (error) {
        setError('Takvim verileri alınırken hata oluştu: ' + error.message);
        console.error("API'den takvim verileri alınırken hata oluştu:", error);
      }
    };

    if (bearerKey) fetchCalendars();
  }, [bearerKey]);

  const saveNote = async () => {
    if (selectedDate && noteInput.trim() !== '') {
      // Yerel depolamaya kaydet (ID olmadan geçici olarak)
      const newNote = { todo: noteInput, date: selectedDate, checked: false };
      const updatedNotes = {
        ...notes,
        [selectedDate]: Array.isArray(notes[selectedDate])
          ? [...notes[selectedDate], newNote]
          : [newNote],
      };
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));

      // API'ye kaydet
      try {
        const response = await fetch('http://217.195.207.244:8081/calendars', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            todo: noteInput,
            date: selectedDate,
            checked: false,
          }),
        });
        if (!response.ok) throw new Error("Not API'ye eklenemedi");
        const savedNote = await response.json();
        // API'den dönen ID ile yerel notu güncelle
        updatedNotes[selectedDate] = updatedNotes[selectedDate].map((note) =>
          note.todo === noteInput && note.date === selectedDate && !note.id
            ? { ...note, id: savedNote.id }
            : note
        );
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        console.log("Not API'ye başarıyla eklendi");
      } catch (error) {
        setError('Not eklenirken hata oluştu: ' + error.message);
        console.error("Not API'ye eklenirken hata oluştu:", error);
      }

      setNoteInput('');
    }
  };

  const deleteNote = async (index) => {
    if (
      selectedDate &&
      Array.isArray(notes[selectedDate]) &&
      notes[selectedDate][index]
    ) {
      const noteToDelete = notes[selectedDate][index];
      const updatedNotes = { ...notes };
      updatedNotes[selectedDate].splice(index, 1);
      if (updatedNotes[selectedDate].length === 0)
        delete updatedNotes[selectedDate];
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));

      // API'den silme
      if (noteToDelete.id) {
        try {
          const response = await fetch(
            `http://217.195.207.244:8081/calendars/${noteToDelete.id}`,
            {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${bearerKey}`,
              },
            }
          );
          if (!response.ok) throw new Error("Not API'den silinemedi");
          console.log("Not API'den başarıyla silindi");
        } catch (error) {
          setError('Not silinirken hata oluştu: ' + error.message);
          console.error("Not API'den silinirken hata oluştu:", error);
          // Hata durumunda yerel notu geri ekle
          updatedNotes[selectedDate] = updatedNotes[selectedDate]
            ? [...updatedNotes[selectedDate], noteToDelete]
            : [noteToDelete];
          setNotes(updatedNotes);
          localStorage.setItem('notes', JSON.stringify(updatedNotes));
        }
      }
    }
  };

  const changeWeek = (direction) => {
    setCurrentWeek(currentWeek.add(direction * 2, 'week'));
    setSelectedDate(null);
    setNoteInput('');
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-[5%] h-full">
        <NewSidebar />
      </div>

      {/* Ana İçerik */}
      <div className="flex-1 p-4 gap-4 flex overflow-auto">
        {/* Sol Taraf: Not Ekleme Bölümü */}
        <div className="w-1/4 p-4 bg-white shadow-lg rounded-lg h-auto overflow-auto">
          <h2 className="text-xl font-bold text-black mb-4">Notlar</h2>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          {selectedDate ? (
            <>
              <h3 className="text-lg font-bold mb-2 text-black">
                Not Ekle ({selectedDate})
              </h3>
              <textarea
                className="w-full p-2 border rounded-lg text-sm text-black placeholder-gray-500"
                placeholder="Bugün için bir not ekle..."
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
              />
              <button
                onClick={saveNote}
                className="w-full mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
              >
                Kaydet
              </button>

              {Array.isArray(notes[selectedDate]) &&
                notes[selectedDate].length > 0 && (
                  <div className="mt-4 bg-gray-200 p-2 rounded-lg shadow">
                    <h3 className="text-sm font-bold mb-2 text-black">
                      Kaydedilen Notlar
                    </h3>
                    <ul>
                      {notes[selectedDate].map((note, index) => (
                        <li
                          key={index}
                          className="flex justify-between Commodities-center border-b py-1 text-xs"
                        >
                          <span className="text-black">{note.todo}</span>
                          <button
                            onClick={() => deleteNote(index)}
                            className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-400"
                          >
                            Sil ❌
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </>
          ) : (
            <p className="text-sm text-black">
              Bir gün seçerek not ekleyebilirsin. 📌
            </p>
          )}
        </div>

        {/* Sağ Taraf: Takvim */}
        <div className="flex flex-col items-center justify-center w-3/4">
          <h1 className="text-3xl font-bold text-black">Takvim</h1>
          <div className="flex items-center justify-between w-full max-w-3xl mb-4">
            <button
              onClick={() => changeWeek(-1)}
              className="px-3 py-2 bg-[#0000cd] text-white rounded-lg hover:bg-gray-700 text-sm"
            >
              ⬅️ Önceki 2 Hafta
            </button>
            <h2 className="text-lg font-bold text-black">
              {currentWeek.format('DD MMMM YYYY')} -{' '}
              {currentWeek.add(13, 'day').format('DD MMMM YYYY')}
            </h2>
            <button
              onClick={() => changeWeek(1)}
              className="px-3 py-2 bg-[#0000cd] text-white rounded-lg hover:bg-gray-700 text-sm"
            >
              Sonraki 2 Hafta ➡️
            </button>
          </div>

          {/* Gün Kutuları */}
          <div className="grid grid-cols-7 gap-2 w-full max-w-4xl">
            {Array.from({ length: 14 }).map((_, i) => {
              const date = currentWeek.add(i, 'day').format('YYYY-MM-DD');
              return (
                <div
                  key={date}
                  className={`border w-[100px] h-[150px] flex flex-col items-center justify-center cursor-pointer rounded-lg text-sm font-semibold transition-all duration-200 ${
                    selectedDate === date
                      ? 'bg-[#0000cd] text-white scale-105'
                      : 'bg-[#0000cd] text-white'
                  }`}
                  onClick={() => {
                    setSelectedDate(date);
                    setNoteInput('');
                  }}
                >
                  <span className="uppercase">{weekDays[i % 7]}</span>
                  <span className="text-lg font-bold">
                    {currentWeek.add(i, 'day').format('DD')}
                  </span>
                  {Array.isArray(notes[date]) && notes[date].length > 0 && (
                    <div className="text-xs bg-white text-black p-1 mt-1 rounded-lg">
                      {notes[date].length} not var 📌
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
