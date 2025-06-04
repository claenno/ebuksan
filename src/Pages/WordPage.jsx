import React, {useEffect, useState} from 'react';
import MenuBar from '../Components/MenuBar';
import DocumentHolder from '../Components/DocumentHolder';
import supabase from "../../supabase";

const WordPage = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const {data, error} = await supabase.from('documents').select('*');
                if (error) throw error;
                setDocuments(data);
            } catch (error) {
                console.error('Error fetching documents:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    return (
        <div
            className="bg-login-background bg-repeat bg-cover bg-center bg-fixed min-h-screen w-screen justify-items-center">
            <div className="w-screen h-[100px] bg-[#860074] md:px-20 px-10 flex items-center">
                <MenuBar/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 pt-5">
                {loading ? (
                    <p className="text-center text-white">Loading Documents...</p>
                ) : (
                    documents.map((doc) => (
                        <DocumentHolder
                            key={doc.id}
                            title={doc.docs_title}
                            description={doc.docs_description}
                            url={doc.docs_url}
                            type={doc.docs_type}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default WordPage;