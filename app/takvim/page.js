'use client';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import NewSidebar from '../components/NewSideBar/page';
import { useAuth } from '@/context/AuthContext';

// dayjs eklentilerini yükle
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.locale('tr');

// Yerel zaman dilimini ayarla
const localTimezone = 'Europe/Istanbul';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [currentMonth, setCurrentMonth] = useState(dayjs().tz(localTimezone).startOf('month'));
  const [noteInput, setNoteInput] = useState('');
  const { bearerKey, user } = useAuth();

  const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Pzr'];

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Eğer kullanıcı kimliği yoksa hiçbir şey yapma
        if (!user) {
          console.error('Kullanıcı kimliği bulunamadı. Takvim verileri yüklenemedi.');
          return;
        }
        
        console.log('Takvim verileri şu kullanıcı için yükleniyor:', user);
        
        const response = await fetch(
          'https://server.lunaproject.com.tr/calendars',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${bearerKey}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!response.ok) throw new Error('Notlar alınamadı');
        
        const data = await response.json();
        const notesByDate = {};
        
        if (!data._embedded || !data._embedded.calendars) {
          console.error('API yanıtı beklenen formatta değil:', data);
          return;
        }
        
        // Sadece geçerli kullanıcıya ait notları filtrele
        const userNotes = data._embedded.calendars.filter(note => {
          // Notun userId'si tanımlı değilse veya geçerli kullanıcıyla eşleşmiyorsa filtrele
          return note.userId && note.userId === user;
        });
        
        console.log('Kullanıcının notları:', userNotes);
        
        userNotes.forEach((note) => {
          // GMT olmadan sadece tarih kısmını al
          const localDate = note.date.split('T')[0];
          if (!notesByDate[localDate]) notesByDate[localDate] = [];
          notesByDate[localDate].push({ id: note.id, todo: note.todo, checked: note.checked });
        });
        
        setNotes(notesByDate);
      } catch (error) {
        console.error('Notlar alınırken hata oluştu:', error);
      }
    };

    if (bearerKey && user) {
      fetchNotes();
    } else {
      console.warn('Oturum veya kullanıcı bilgisi eksik. Notlar alınamıyor.');
    }
  }, [bearerKey, user]);

  const saveNote = async () => {
    if (!selectedDate || noteInput.trim() === '') {
      return;
    }
    
    // Kullanıcı kimliği kontrolü
    if (!user) {
      console.error('Kullanıcı kimliği bulunamadı. Not eklenemiyor.');
      return;
    }
    
    // Yerel saat dilimine göre tarih oluştur
    const localDate = selectedDate;
    
    try {
      console.log(`${localDate} tarihine not ekleniyor:`, noteInput);
      
      const response = await fetch(
        'https://server.lunaproject.com.tr/calendars',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: localDate, // Zaman dilimi olmadan sadece tarih gönder
            userId: user,
            todo: noteInput,
            checked: false,
          }),
        }
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Not eklenemedi: ${errorText}`);
      }
      
      const newNote = await response.json();
      console.log('Yeni not başarıyla eklendi:', newNote);
      
      const updatedNotes = {
        ...notes,
        [selectedDate]: notes[selectedDate]
          ? [...notes[selectedDate], { id: newNote.id, todo: noteInput, checked: false }]
          : [{ id: newNote.id, todo: noteInput, checked: false }],
      };
      
      setNotes(updatedNotes);
      setNoteInput('');
    } catch (error) {
      console.error('Not eklenirken hata oluştu:', error);
      alert('Not eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const deleteNote = async (index) => {
    // Seçili tarih, notlar ve istenen indeks kontrolü
    if (!selectedDate || !notes[selectedDate] || !notes[selectedDate][index]) {
      console.error('Silinecek not bulunamadı.');
      return;
    }
    
    // Kullanıcı kimliği kontrolü
    if (!user || !bearerKey) {
      console.error('Kullanıcı kimliği veya oturum bilgisi bulunamadı. Not silinemiyor.');
      return;
    }
    
    const noteId = notes[selectedDate][index].id;
    const noteContent = notes[selectedDate][index].todo;
    
    // Silme işlemi için onay
    if (!window.confirm(`"${noteContent}" notunu silmek istediğinize emin misiniz?`)) {
      return;
    }
    
    try {
      console.log(`${selectedDate} tarihindeki "${noteContent}" notu siliniyor...`);
      
      const response = await fetch(
        `https://server.lunaproject.com.tr/calendars/${noteId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Not silinirken hata oluştu: ${errorText}`);
      }
      
      console.log('Not başarıyla silindi');
      
      // UI'ı güncelle
      const updatedNotes = { ...notes };
      updatedNotes[selectedDate].splice(index, 1);
      
      if (updatedNotes[selectedDate].length === 0) {
        delete updatedNotes[selectedDate];
      }
      
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Not silinirken hata oluştu:', error);
      alert('Not silinirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const changeMonth = (direction) => {
    setCurrentMonth(currentMonth.add(direction, 'month'));
    setSelectedDate(null);
    setNoteInput('');
  };

  // Yerel zaman dilimine göre ay içerisindeki gün sayısını hesapla
  const daysInMonth = currentMonth.daysInMonth();
  // Yerel zaman dilimine göre ayın ilk gününü hesapla
  const firstDayOfMonth = currentMonth.startOf('month').day() || 7;

  // Bugünün tarihini yerel formatta al
  const today = dayjs().tz(localTimezone).format('YYYY-MM-DD');

  return (
    <div className="flex">
      <NewSidebar />
      <div className="flex h-screen w-screen bg-[#EDF7FA] p-2 pt-20">
        <div className="w-1/3 p-4 bg-[#0000cd] shadow-lg rounded-lg h-full overflow-auto">
          <h2 className="text-2xl font-bold text-white mb-3 mt-4">Notlar</h2>
          {selectedDate ? (
            <>
              <h3 className="text-lg text-white font-bold mb-2">
                Not Ekle ({selectedDate})
              </h3>
              <textarea
                className="w-full p-2 border rounded-lg text-base placeholder-black text-black"
                placeholder="Bugün için bir not ekle..."
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
              />
              <div className="flex gap-3 mt-3">
                <button
                  onClick={saveNote}
                  className="px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-500 text-sm"
                >
                  Kaydet
                </button>
              </div>
              {Array.isArray(notes[selectedDate]) &&
                notes[selectedDate].length > 0 && (
                  <div className="mt-3 w-full bg-gray-200 p-3 rounded-lg shadow">
                    <h3 className="text-lg font-bold mb-2 text-black">
                      Kaydedilen Notlar
                    </h3>
                    <ul>
                      {notes[selectedDate].map((note, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center border-b py-1"
                        >
                          <span className="text-black text-sm">
                            {note.todo}
                          </span>
                          <button
                            onClick={() => deleteNote(index)}
                            className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-400 text-xs"
                          >
                            Sil
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </>
          ) : (
            <p className="text-white text-sm">
              Bir gün seçerek not ekleyebilirsin.
            </p>
          )}
        </div>
        <div className="flex flex-col items-center justify-start w-2/3 p-2 pt-12">
          <div className="flex items-center justify-between w-full max-w-3xl mb-4">
            <button
              onClick={() => changeMonth(-1)}
              className="px-3 py-1 bg-gray-800 text-white rounded-lg hover:bg-gray-700 text-sm"
            >
              Önceki Ay
            </button>
            <h2 className="text-xl font-bold text-black">
              {currentMonth.format('MMMM YYYY')}
            </h2>
            <button
              onClick={() => changeMonth(1)}
              className="px-3 py-1 bg-gray-800 text-white rounded-lg hover:bg-gray-700 text-sm"
            >
              Sonraki Ay
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 w-full max-w-3xl mb-1">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-bold text-black"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 w-full max-w-3xl">
            {Array.from({ length: firstDayOfMonth - 1 }).map((_, i) => (
              <div key={`empty-${i}`} className="border w-full h-[80px]" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              // Yerel zaman dilimine göre tarihi formatlama
              const date = currentMonth.date(i + 1).format('YYYY-MM-DD');
              const dayOfWeek = currentMonth.date(i + 1).day();
              const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
              const isToday = date === today;

              return (
                <div
                  key={date}
                  className={`border w-full h-[80px] flex flex-col items-center justify-center cursor-pointer rounded-lg text-sm font-semibold transition-all duration-200 ${
                    selectedDate === date
                      ? 'bg-blue-500 text-white scale-105'
                      : isToday
                      ? 'bg-green-600 text-white'
                      : isWeekend
                      ? 'bg-red-600 text-white'
                      : 'bg-[#0000cd] text-white'
                  }`}
                  onClick={() => {
                    setSelectedDate(date);
                    setNoteInput('');
                  }}
                >
                  <span className="text-base font-bold">{i + 1}</span>
                  {Array.isArray(notes[date]) && notes[date].length > 0 && (
                    <div className="text-xs bg-white text-black p-1 mt-1 rounded-lg overflow-hidden max-h-[30px] w-[90%] text-center">
                      {notes[date].length} not
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
